import {Component, OnInit} from '@angular/core';
import {User} from 'src/assets/models/user';
import {DialogService} from 'src/assets/service/dialog.service';
import {UserService} from 'src/assets/service/user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {


  public user!: User;

  constructor(
    private dialogService: DialogService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userService.getLoggedUser().subscribe({
      next: res => {
        this.user = res;
      },
    });
  }
}
