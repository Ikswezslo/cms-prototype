import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from 'src/assets/models/user';
import {UserService} from 'src/assets/service/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  public user?: User;
  public loggedUser?: User;
  public id: Number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('userId'));

    this.loadUser();

    this.getLoggedUser();

  }

  loadUser() {
    this.userService.getUser(this.id)
      .subscribe(res => {

        this.user = res;
        //this.user.accountType === "ADMIN"
      });
  }

  getLoggedUser() {
    this.userService.getLoggedUser()
      .subscribe(res => {
        this.loggedUser = res;
      })
  }

  activeUser() {
    if (this.user != null) {
      let editUser = this.user;
      editUser.enabled = !this.user.enabled;
      console.log(editUser);
      this.userService.editUser(editUser.id, editUser).subscribe(() => {
        this.loadUser();
      });
    }
  }
}
