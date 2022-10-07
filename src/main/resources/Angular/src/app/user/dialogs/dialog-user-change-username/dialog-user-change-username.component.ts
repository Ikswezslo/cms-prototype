import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../dialog-user-create/dialog-user-create.component";
import {UserService} from "../../../../assets/service/user.service";
import {ErrorHandleService} from "../../../../assets/service/error-handle.service";
import {RestError} from "../../../../assets/models/restError";

@Component({
  selector: 'app-dialog-user-change-username',
  templateUrl: './dialog-user-change-username.component.html',
  styleUrls: ['./dialog-user-change-username.component.scss']
})
export class DialogUserChangeUsernameComponent implements OnInit {

  usernameControl = new FormControl('', [Validators.required]);

  exiting: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogUserChangeUsernameComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private userService: UserService,
              private errorHandleService: ErrorHandleService) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  changeUsername(username: string | null) {
    if (this.data.user && username) {
      this.exiting = true;
      this.userService.modifyUserUsernameField(this.data.user.id, username).subscribe({
        next: () => {
          if (this.data.user) {
            this.data.user.username = username;
          }
          this.dialogRef.close(true);
        },
        error: err => {
          let restError = err as RestError
          this.exiting = false;
          if (restError.error === "Bad Request") {
            this.errorHandleService.openDataErrorDialog(restError.message);
          }
        }
      })
    }
  }
}
