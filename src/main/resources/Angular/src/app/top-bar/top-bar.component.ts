import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Page} from 'src/assets/models/page';
import {University} from 'src/assets/models/university';
import {User} from 'src/assets/models/user';
import {PageService} from '../../assets/service/page.service';
import {UserService} from 'src/assets/service/user.service';
import {ErrorHandlerService} from "../../assets/service/error-handler.service";
import {TranslateService} from "@ngx-translate/core";

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
    private errorHandler: ErrorHandlerService,
    private translate: TranslateService) {}

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

  translate_to_en(){
    this.translate.use('en')
  }

  translate_to_pl(){
    this.translate.use('pl')
  }

  logout() {
    this.userService.logout(false).subscribe({
      next: user => {
        this.logged = false;
        this.userLogged = null;
        this.userService.loggedUser = null;
        window.location.replace('');
      },
      error: err => {
      }
    });
  }
}
