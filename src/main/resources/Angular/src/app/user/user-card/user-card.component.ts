import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../assets/models/user";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

    @Input() user?: User;
    @Input() config: UserCardConfig = {} as UserCardConfig

    constructor(private translate: TranslateService) {
    }

    ngOnInit(): void {
    }

    getTranslatedAccountType() {
        switch (this.user?.accountType) {
            case "ADMIN":
                return this.translate.instant("MAIN_ADMIN");
            case "MODERATOR":
                return this.translate.instant("UNIVERSITY_ADMIN");
            case "USER":
                return this.translate.instant("USER");
        }
    }
}

export interface UserCardConfig {
  useSecondaryColor: boolean;
  showLink: boolean;
}
