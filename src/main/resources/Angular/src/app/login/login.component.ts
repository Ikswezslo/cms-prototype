import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from 'src/assets/service/user.service';
import {ErrorHandlerService} from "../../assets/service/error-handler.service";
import {DialogService} from "../../assets/service/dialog.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {} as { username: string, password: string };
  showSpinner = false;

  constructor(private userService: UserService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private dialogService: DialogService) {
  }

  ngOnInit(): void {
    if (this.userService.loggedUser) {
      this.router.navigateByUrl('/');
    }
  }

  login(): void {
    this.userService.login(this.user, false).subscribe({
      next: () => {
        this.userService.getLoggedUser().subscribe({
          next: user => {
            this.userService.loggedUser = user;
            window.location.reload();
          }
        })
      },
      error: err => {
        if (err.status === 401) {
          this.user = {username: '', password: ''};
          this.dialogService.openErrorDialog(err.message)
        } else
            this.errorHandler.handleError(err);
      }
    });
  }

}
