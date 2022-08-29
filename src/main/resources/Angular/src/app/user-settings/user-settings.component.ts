import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { PageService } from '../service/page.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

 
  public user!: User;
  public id: Number = 0;
  viewOnly = true;

  constructor(
    private route: ActivatedRoute,
    private userService: PageService) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('userId'));
    this.id = 1;
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser(this.id)
      .subscribe(res => {
        this.user = res;
      });
  }

  startEdit() {
    this.viewOnly = false;
  }

  stopEdit() {
    this.viewOnly = true;
  }

  save() {
    
    this.stopEdit();
  }
}