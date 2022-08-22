import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { page } from '../models/page';
import { universitie } from '../models/universitie';
import { User } from '../models/user';
import { PageService } from '../service/page.service';

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
    isAccountDisabled: false
  };
  imageSrc = 'assets/images/pp.png'
  universitys: universitie[]= [];
  users: User[] = [];
  pages: page[] = [];

  constructor(private getService: PageService) { }

  ngOnInit(): void {
    this.getService.getUser(1)
      .subscribe(res => {
        this.userLogged = res;
      })
    this.getService.getPages()
      .subscribe(res => {
        this.pages = res.filter(element => !element.hidden);
      });
    this.getService.getUniversities()
      .subscribe(res => {
        this.universitys = res;
      });
    this.getService.getUsers()
      .subscribe(res => {
        this.users = res;
      })
  }



}
