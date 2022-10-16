import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {University} from 'src/assets/models/university';
import {ErrorHandleService} from 'src/assets/service/error-handle.service';
import {UniversityService} from 'src/assets/service/university.service';
import {User} from "../../../assets/models/user";
import {UserService} from "../../../assets/service/user.service";
import {PageCardConfig} from "../../page/page-card/page-card.component";
import {UserCardConfig} from "../../user/user-card/user-card.component";
import {UniversityCardConfig} from "../university-card/university-card.component";
import {ConfirmationDialogComponent} from "../../dialog/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../dialog/error-dialog/error-dialog.component";
import {PageService} from "../../../assets/service/page.service";

@Component({
  selector: 'app-university-details',
  templateUrl: './university-details.component.html',
  styleUrls: ['./university-details.component.scss']
})
export class UniversityDetailsComponent implements OnInit {

  public university!: University;
  public id: Number = 0;
  public loggedUser!: User;

  userCardConfig: UserCardConfig = {
    useSecondaryColor: true,
    showGoToButton: true,
    showSettings: false
  };

  secondaryCardConfig: PageCardConfig = {
    useSecondaryColor: true,
    showGoToButton: true,
    showDescription: true,
    showUniversity: false,
    showCreatedOn: true,
    showAuthor: true
  };
  universityCardConfig: UniversityCardConfig = {
    useSecondaryColor: false,
    showGoToButton: true,
    showDescription: true,
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private universityService: UniversityService,
    private pageService: PageService,
    private errorHandleService: ErrorHandleService,
    private userService: UserService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('universityId'));
    this.getLoggedUser();
    this.loadUniversity();
  }

  loadUniversity() {
    this.universityService.getUniversity(this.id)
      .subscribe({
        next: res => {
        this.university = res;
        console.log(res);
        },
        error: err => {
          this.errorHandleService.openDataErrorDialog();
        }
      });
  }

  hiddenUniversity() {
    this.universityService.modifyUniversityHiddenField(this.university.id, !this.university.hidden).subscribe(() => {
      this.university.hidden = !this.university.hidden;
    });

  }

  deleteUniversity() {
    const deletingDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Deleting ' + this.university.name,
        description: 'Are you sure you want to delete this university? It might induce other changes.'
      }
    });
    deletingDialog.afterClosed().subscribe(res => {
      if (res) {

        this.universityService.deleteUniversity(this.university.id).subscribe(
          {
            next: () => {
              //TODO: Dialog for success
              this.router.navigateByUrl('/universities');
            },
            error: err => {
              const errorDialog = this.dialog.open(ErrorDialogComponent, {
                data: {
                  description: err.message || 'Error has occurred during deleting user'
                }
              });
              errorDialog.afterClosed().subscribe({
                next: () => {
                  this.router.navigateByUrl('/university/' + this.university.id);
                }
              });
            }
          }
        );


      } else {
        this.router.navigateByUrl('/university/' + this.university.id);
      }
    });

  }

  getLoggedUser() {
    this.userService.getLoggedUser()
      .subscribe({
        next: res => {
          this.loggedUser = res;
        },
        error: err => {
          this.errorHandleService.openLoggedUserErrorDialog();
        }
      })
  }

}


