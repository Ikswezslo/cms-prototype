import {Component, OnInit} from '@angular/core';
import {Page} from 'src/assets/models/page';
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

  userLogged: User= {
    id: 0,
    firstName: 'Wiktoria',
    lastName: 'Moczulak',
    username: 'wmoczulak',
    accountType: "Admin",
    password: '',
    email: '',
    phoneNumber: '',
    enabled: false
  };
  imageSrc = 'assets/images/pp.png'
  universities: University[]= [];
  users: User[] = [];
  pages: Page[] = [];

  constructor(
    private pageService: PageService,
    private userService: UserService,
    private universityService: UniversityService) { }

  ngOnInit(): void {
    this.userService.getUser(1)
      .subscribe(res => {
        this.userLogged = res;
      })
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



}
