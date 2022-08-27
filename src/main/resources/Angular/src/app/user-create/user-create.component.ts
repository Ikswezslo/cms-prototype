import {Component, OnInit} from '@angular/core';
import {UserForm} from '../models/user';
import {PageService} from '../service/page.service';

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

    readonly user = {} as UserForm;

    constructor(private userService: PageService) {
    }

    ngOnInit(): void {
    }

    createUser(): void {
        console.log(this.user);
        this.userService.createUser(this.user).subscribe({
            next: user => console.log(user)
        });
    }
}
