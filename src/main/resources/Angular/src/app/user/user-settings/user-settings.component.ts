import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from 'src/assets/models/user';
import { ErrorHandleService } from 'src/assets/service/error-handle.service';
import {UserService} from 'src/assets/service/user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {


  public user!: User;

  constructor(
    private errorHandleService: ErrorHandleService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userService.getLoggedUser()
      .subscribe({
        next: res => {
        this.user = res;
        },
        error: err => {
          this.errorHandleService.openDataErrorDialog();
      }});
  }

  // startEdit() {
  //   let dialogData = {
  //     data: {
  //       edit: true,
  //       user: this.user
  //     }
  //   }
  //
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.loadUsers();
  //   });
  // }

}
