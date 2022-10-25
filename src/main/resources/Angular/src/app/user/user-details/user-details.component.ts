import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from 'src/assets/models/page';
import {User} from 'src/assets/models/user';
import {PageService} from 'src/assets/service/page.service';
import {UserService} from 'src/assets/service/user.service';
import {DialogUserCreateComponent} from '../dialog-user-create/dialog-user-create.component';
import {PageCardConfig} from "../../page/page-card/page-card.component";
import {UserCardConfig} from "../user-card/user-card.component";
import {DialogUserAddUniversityComponent} from "../dialog-user-add-university/dialog-user-add-university.component";
import { ErrorHandleService } from 'src/assets/service/error-handle.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {


  @Input() settings: boolean = false;
  @Input() settingsId!: Number;
  public pages!: Page[];
  public loggedUser!: User;
  public user!: User;
  public id!: Number;

  userCardConfig: UserCardConfig = {
    useSecondaryColor: false,
    showGoToButton: false,
    showSettings: false
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
    public dialog: MatDialog,
    private errorHandleService: ErrorHandleService,
    private pageService: PageService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = this.settingsId ?? Number(routeParams.get('userId'));
    this.loadUser();
    this.loadPages(this.id);
    this.getLoggedUser();

    this.userCardConfig.showSettings = this.settings;
  }

  loadUser() {
    this.userService.getUser(this.id)
      .subscribe({
        next: res => {
        this.user = res;
        },
        error: err => {
          this.errorHandleService.openDataErrorDialog();
      }});
  }

  getLoggedUser() {
    this.userService.getLoggedUser()
      .subscribe({
        next: res => {
        this.loggedUser = res;
        },
        error: err => {}})
  }

  activeUser() {
    if (this.user != null) {
      this.userService.modifyUserEnabledField(this.id, !this.user.enabled).subscribe(() => {
        this.user.enabled = !this.user.enabled;
      });
    }
  }

  loadPages(userId: Number) {
    this.pageService.getPages()
      .subscribe({
        next: res => {
        this.pages = res.filter(element => element.creator.id == userId);
        },
        error: err => {
          this.errorHandleService.openDataErrorDialog();
      }});
  }

  startEdit() {
    let dialogData = {
      data: {
        edit: true,
        user: this.user
      }
    }

    const dialogRef = this.dialog.open(DialogUserCreateComponent, dialogData);

    // dialogRef.afterClosed().subscribe(result => {
    //   this.loadUsers();
    // });
  }

  openAddUniversityDialog() {
    const dialogRef = this.dialog.open(DialogUserAddUniversityComponent, {
      data: {user: this.user},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.user = result;
      }
    });
  }
}
