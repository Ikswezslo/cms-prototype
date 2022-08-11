import { Component, OnInit } from '@angular/core';
import { university } from '../university';
import { user } from '../user';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  userLogged = user[0];
  imageSrc = 'assets/images/pp.png'  
  universitys = university;
  users = user;

  constructor() { }

  ngOnInit(): void {
  }

}
