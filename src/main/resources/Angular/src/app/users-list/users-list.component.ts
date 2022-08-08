import { Component, OnInit } from '@angular/core';
import { user } from '../user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users = user;
  constructor() { }

  ngOnInit(): void {
  }

}
