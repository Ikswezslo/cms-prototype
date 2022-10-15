import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {University} from 'src/assets/models/university';
import {DialogService} from 'src/assets/service/dialog.service';
import {UniversityService} from 'src/assets/service/university.service';
import {User} from "../../../assets/models/user";
import {UserService} from "../../../assets/service/user.service";
import {PageCardConfig} from "../../page/page-card/page-card.component";
import {UserCardConfig} from "../../user/user-card/user-card.component";
import {UniversityCardConfig} from "../university-card/university-card.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogUniversityCreateComponent} from "../dialog-university-create/dialog-university-create.component";

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
    private universityService: UniversityService,
    private errorHandleService: DialogService,
    private userService: UserService,
    public dialog: MatDialog) {
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
      }});
  }

  hiddenUniversity() {
    this.universityService.modifyUniversityHiddenField(this.university.id, !this.university.hidden).subscribe(() => {
      this.university.hidden = !this.university.hidden;
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
      }})
  }

  startEdit() {
    let dialogData = {
      data: {
        edit: true,
        university: this.university
      }
    }
    const dialogRef = this.dialog.open(DialogUniversityCreateComponent, dialogData);
    dialogRef.afterClosed().subscribe(() => {
      this.loadUniversity();
    });
  }
}


