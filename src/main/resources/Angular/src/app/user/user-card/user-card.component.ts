import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../assets/models/user";

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

    @Input() user?: User;
    @Input() config: UserCardConfig = {} as UserCardConfig

    constructor() {
    }

    ngOnInit(): void {
    }

}

export interface UserCardConfig {
  useSecondaryColor: boolean;
  showLink: boolean;
}
