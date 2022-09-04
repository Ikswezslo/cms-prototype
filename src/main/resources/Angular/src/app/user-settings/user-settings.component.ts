import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/assets/models/user';
import { UserService } from 'src/assets/service/user.service';
import { DialogUserCreateComponent } from '../dialog-user-create/dialog-user-create.component';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

 
  public user!: User;
  public id: Number = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    console.log("tutaj");
    const routeParams = this.route.snapshot.paramMap;
    //this.id = Number(routeParams.get('userId'));
    this.id = 1;
    this.loadUser();
  }

  loadUser() {
    console.log(this.id)
    this.userService.getUser(1)
      .subscribe(res => {
        this.user = res;
      });
  }

  startEdit() {
    let dialogData = {
      data: {
        edit: true,
        user: this.user
      }
    }

    const dialogRef = this.dialog.open(DialogUserCreateComponent, dialogData);

    // dialogRef.afterClosed().subscribe(result => {
    //   this.loadUsers();
    // });
  }

}