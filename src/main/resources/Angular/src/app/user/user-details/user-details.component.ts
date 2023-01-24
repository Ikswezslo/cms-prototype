import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from 'src/assets/models/page';
import {User} from 'src/assets/models/user';
import {PageService} from 'src/assets/service/page.service';
import {UserService} from 'src/assets/service/user.service';
import {PageCardConfig} from "../../page/page-card/page-card.component";
import {UserCardConfig} from "../user-card/user-card.component";
import {
  DialogUserEnrolledUniversitiesComponent
} from "../dialogs/dialog-user-enrolled-universities/dialog-user-enrolled-universities.component";
import {DialogService} from 'src/assets/service/dialog.service';
import {
  DialogUserChangePasswordComponent
} from "../dialogs/dialog-user-change-password/dialog-user-change-password.component";
import {
  DialogUserChangeUsernameComponent
} from "../dialogs/dialog-user-change-username/dialog-user-change-username.component";
import {DialogUserUpdateComponent} from "../dialogs/dialog-user-update/dialog-user-update.component";
import {
  DialogUserChangeAccountTypeComponent
} from "../dialogs/dialog-user-change-account-type/dialog-user-change-account-type.component";
import {ConfirmationDialogComponent} from "../../dialog/confirmation-dialog/confirmation-dialog.component";
import {SecurityService} from "../../../assets/service/security.service";
import {TranslateService} from "@ngx-translate/core";
import {ErrorHandlerService} from "../../../assets/service/error-handler.service";


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Input() id?: Number;
  public pages!: Page[];
  public user!: User;

  userCardConfig: UserCardConfig = {
    useSecondaryColor: false,
    showLink: false,
  };

  pageCardConfig: PageCardConfig = {
    useSecondaryColor: true,
    showLink: true,
    showDescription: true,
    showUniversity: true,
    showCreatedOn: true,
    showAuthor: false
  };

  constructor(
    public securityService: SecurityService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private errorHandler: ErrorHandlerService,
    private dialogService: DialogService,
    private pageService: PageService,
    private translate: TranslateService) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = this.id ?? Number(routeParams.get('userId'));
    this.loadUser();
    this.loadPages(this.id);
  }

  loadUser() {
    if (this.id) {
      this.userService.getUser(this.id)
        .subscribe({
          next: res => {
            this.user = res;
          }
        });
    }
  }

  activeUser() {
    if (this.user) {
      this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: this.translate.instant("CHANGE_ACCOUNT_STATE") + ": " + this.user.username,
          description: this.translate.instant("HIDE_DESCRIPTION")
        }
      }).afterClosed().subscribe(res => {
        if (res) {
          this.userService.modifyUserEnabledField(this.user.id, !this.user.enabled).subscribe(() => {
            this.user.enabled = !this.user.enabled;
            this.dialogService.openSuccessDialog(this.translate.instant("HIDING_CONFIRMATION"));
          });
        }
      })

    }
  }

  loadPages(userId: Number) {
    this.pageService.getCreatorPages(userId)
      .subscribe({
        next: res => {
          this.pages = res;
        },
        error: err => {
          if(err.status !== 404)
            this.errorHandler.handleError(err);
        }
      });
  }

  deleteUser() {
    const deletingDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: this.translate.instant("DELETING") + ' ' + this.user.username,
        description: this.translate.instant("DELETE_USER_DESCRIPTION")
      }
    });

    deletingDialog.afterClosed().subscribe(res => {
      if (res) {
        this.userService.deleteUser(this.user.id).subscribe({
          next: () => {
            this.dialogService.openSuccessDialog(this.translate.instant("DELETE_USER_CONFIRMATION"));
            this.router.navigateByUrl('/accounts');
          }
        })
      }
    });
  }

  openEnrolledUniversitiesDialog() {
    const dialogRef = this.dialog.open(DialogUserEnrolledUniversitiesComponent, {
      data: {user: this.user},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = result;
      }
    });
  }

  openChangePasswordDialog() {
    this.dialog.open(DialogUserChangePasswordComponent, {
      data: {user: this.user}
    });
  }

  openChangeUsernameDialog() {
    this.dialog.open(DialogUserChangeUsernameComponent, {
      data: {user: this.user},
    });
  }

  openUpdateDialog() {
    const dialogRef = this.dialog.open(DialogUserUpdateComponent, {
      data: {user: this.user},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = result;
      }
    });
  }

  openChangeAccountTypeDialog() {
    this.dialog.open(DialogUserChangeAccountTypeComponent, {
      data: {user: this.user},
    });
  }
}
