import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import {Page} from 'src/assets/models/page';
import { RestErrorHandler } from 'src/assets/models/restError';
import {University} from 'src/assets/models/university';
import {User} from 'src/assets/models/user';
import { ErrorHandleService } from 'src/assets/service/error-handle.service';
import {UniversityService} from 'src/assets/service/university.service';
import {UserService} from 'src/assets/service/user.service';
import {PageService} from '../../assets/service/page.service';
import { ErrorDialogComponent } from '../dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  logged = false;
  userLogged!: User;
  imageSrc = 'src/assets/images/logo.jpg'
  universities: University[]= [];
  users: User[] = [];
  pages: Page[] = [];

  constructor(
    private router: Router,
    private pageService: PageService,
    private userService: UserService,
    private errorHandleService: ErrorHandleService,
    private universityService: UniversityService) { }

  ngOnInit(): void {

    this.userService.getLoggedUser(false)
      .subscribe({
        next: res => {
          this.userLogged = res;
          this.logged = true;
        },
        error: err => {
          if (err.status != "401")
            this.errorHandleService.openLoggedUserErrorDialog();
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
            this.errorHandleService.openDataErrorDialog()
          }
        });
  }

  logout() {
    this.logged = false;
    this.userService.logout(false).subscribe({
      next: user => {
        this.router.navigateByUrl('');
      },
      error: err => {
      }
  });
 }
}
