import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { PageService } from '../service/page.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  public selected = true;

  constructor(
    private http: HttpClient,
    private userService: PageService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(showHidden: Boolean = true) {
    this.userService.getUsers()
      .subscribe(res => {
        this.users = res;
    });
  }

}
