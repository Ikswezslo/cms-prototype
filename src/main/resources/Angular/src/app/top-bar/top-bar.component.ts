import {Component, OnInit} from '@angular/core';
import { Route, Router } from '@angular/router';
import {Page} from 'src/assets/models/page';
import { RestErrorHandler } from 'src/assets/models/restError';
import {University} from 'src/assets/models/university';
import {User} from 'src/assets/models/user';
import {UniversityService} from 'src/assets/service/university.service';
import {UserService} from 'src/assets/service/user.service';
import {PageService} from '../../assets/service/page.service';

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
    private universityService: UniversityService) { }

  ngOnInit(): void {

    this.userService.getLoggedUser(false)
      .subscribe({
        next: res => {
          this.userLogged = res;
          this.logged = true;
          this.loadData();
        },
        error: err => {
          if (err.status != "401")
            RestErrorHandler.handleError(err);
        }
      })
    }
    
  loadData() {
    this.pageService.getPages()
      .subscribe(res => {
        this.pages = res.filter(element => !element.hidden);
      });
    this.universityService.getUniversities()
      .subscribe(res => {
        this.universities = res;
      });
    this.userService.getUsers()
      .subscribe(res => {
        this.users = res;
      })
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
