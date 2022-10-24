import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {zip} from 'rxjs';
import {Page} from 'src/assets/models/page';
import {University} from 'src/assets/models/university';
import {User} from 'src/assets/models/user';
import {UniversityService} from 'src/assets/service/university.service';
import {PageService} from '../../assets/service/page.service';
import {DialogService} from 'src/assets/service/dialog.service';
import {UserService} from 'src/assets/service/user.service';
import {ErrorHandlerService} from "../../assets/service/error-handler.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  logged = false;
  public userLogged!: User | null;
  imageSrc = 'src/assets/images/logo.jpg'
  universities: University[] = [];
  users: User[] = [];
  pages: Page[] = [];

  constructor(
    private router: Router,
    private pageService: PageService,
    private userService: UserService,
    private dialogService: DialogService,
    private universityService: UniversityService,
    private errorHandler: ErrorHandlerService) {
  }

  ngOnInit(): void {

    if (this.userService.loggedUser) {
      this.userLogged = this.userService.loggedUser;
      this.logged = true;
    } else {
      this.userLogged = null;
      this.logged = false;
    }
  }

  getLoggedUser() {
    this.userService.getLoggedUser(false)
      .subscribe({
        next: res => {
          this.userService.loggedUser = res
          this.userLogged = res;
          this.logged = true;
        },
        error: err => {
          if (err.status != "401")
            this.errorHandler.handleError(err);
          //this.dialogService.openLoggedUserErrorDialog();
        }
      })
  }

  loadData() {
    zip(
      this.pageService.getPages(),
      this.universityService.getUniversities(),
      this.userService.getUsers()
    ).subscribe({
      next: ([pagesRes, universitiesRes, usersRes]) => {
        this.pages = pagesRes.filter(element => !element.hidden);
        this.universities = universitiesRes;
        this.users = usersRes;
      },
      error: err => {
        this.dialogService.openDataErrorDialog()
      }
    });
  }

  logout() {
    this.logged = false;
    this.userLogged = null;
    this.userService.loggedUser = null;
    window.location.replace('');
    this.userService.logout(false).subscribe({
      next: user => {
      },
      error: err => {
      }
    });
  }
}
