import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Page} from 'src/assets/models/page';
import {University} from 'src/assets/models/university';
import {User} from 'src/assets/models/user';
import {PageService} from '../../assets/service/page.service';
import {UserService} from 'src/assets/service/user.service';

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
    private userService: UserService) {
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
