import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RestErrorHandler} from 'src/assets/models/restError';
import {UserService} from 'src/assets/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {} as { username: string, password: string };
  showSpinner = false;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.userService.loggedUser) {
      this.router.navigateByUrl('/');
    }
  }

  login(): void {
    this.userService.login(this.user, false).subscribe({
      next: data => {
        this.userService.getLoggedUser().subscribe({
          next: user => {
            this.userService.loggedUser = user;
            window.location.reload();
          }
        })
      },
      error: err => {
        if (err.status == "401") {
          this.user = {username: '', password: ''};
        } else
          RestErrorHandler.handleError(err);
      }
    });
  }

}
