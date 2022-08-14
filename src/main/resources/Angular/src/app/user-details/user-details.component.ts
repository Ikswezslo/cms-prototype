import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { user } from '../models/user';
import { PageService } from '../service/page.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  public user!: user;
  public id: Number = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: PageService) { 
  }

  ngOnInit(): void{
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('userId'));
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser(this.id)
    .subscribe(res => {
      this.user = res;
    });
  }
}
