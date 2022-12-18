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
import {ErrorDialogComponent} from "../../dialog/error-dialog/error-dialog.component";
import {SecurityService} from "../../../assets/service/security.service";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {


  @Input() settings: boolean = true;
  @Input() settingsId!: Number;
  public pages!: Page[];
  public user!: User;
  public id!: Number;

  userCardConfig: UserCardConfig = {
    useSecondaryColor: false,
    showGoToButton: false,
    showSettings: true
  };

  pageCardConfig: PageCardConfig = {
    useSecondaryColor: true,
    showGoToButton: true,
    showDescription: true,
    showUniversity: true,
    showCreatedOn: true,
    showAuthor: false
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    public securityService: SecurityService,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private pageService: PageService,
    private translate: TranslateService) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = this.settingsId ?? Number(routeParams.get('userId'));
    this.loadUser();
    this.loadPages(this.id);

    this.userCardConfig.showSettings = this.settings;
  }

  loadUser() {
    this.userService.getUser(this.id)
      .subscribe({
        next: res => {
          this.user = res;
        },
        error: err => {
          this.dialogService.openDataErrorDialog();
        }
      });
  }

  activeUser() {
    if (this.user != null) {
      this.userService.modifyUserEnabledField(this.id, !this.user.enabled).subscribe(() => {
        this.user.enabled = !this.user.enabled;
      });
    }
  }

  loadPages(userId: Number) {
    this.pageService.getCreatorPages(userId)
      .subscribe({
        next: res => {

          this.pages = res;
        },
        error: err => {
          const errorDialog = this.dialog.open(ErrorDialogComponent, {
            data: {
              description: err.message
            }
          });
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
          },
          error: err => {
            const errorDialog = this.dialog.open(ErrorDialogComponent, {
              data: {
                description: err.message || this.translate.instant("DELETE_USER_ERROR")
              }
            });
            errorDialog.afterClosed().subscribe({
              next: () => {
                this.router.navigateByUrl('/account/' + this.user.id);
              }
            });
          }
        })
      } else {
        this.router.navigateByUrl('/account/' + this.user.id);
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
