import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from 'src/assets/service/user.service';
import {ErrorHandlerService} from "../../assets/service/error-handler.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    user = {} as { username: string, password: string };
    showSpinner = false;

    constructor(
      private userService: UserService,
      private router: Router,
      private errorHandler: ErrorHandlerService
    ) {
    }

    ngOnInit(): void {
    }

    login(): void {
        this.userService.login(this.user, false).subscribe({
            next: user => {
                this.userService.loggedUser = user;
                this.router.navigateByUrl('/');
            },
            error: err => {
                if (err.status === 401) {
                    this.user = {username: '', password: ''};
                } else
                    this.errorHandler.handleError(err);
            }
        });
    }

}
