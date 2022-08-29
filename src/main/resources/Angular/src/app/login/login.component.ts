import {Component, OnInit} from '@angular/core';
import { UserService } from 'src/assets/service/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    readonly user = {} as { username: string, password: string };

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
    }

    login(): void {
        console.log(this.user);
        this.userService.login(this.user).subscribe({
            next: user => console.log(user)
        });
    }

}
