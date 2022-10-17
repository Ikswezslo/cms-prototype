import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../assets/service/user.service";
import {ErrorHandleService} from "../../../../assets/service/error-handle.service";
import {RestError} from "../../../../assets/models/restError";
import {SuccessDialogComponent} from "../../../dialog/success-dialog/success-dialog.component";

@Component({
  selector: 'app-dialog-user-change-username',
  templateUrl: './dialog-user-change-username.component.html',
  styleUrls: ['./dialog-user-change-username.component.scss']
})
export class DialogUserChangeUsernameComponent implements OnInit {

  usernameControl = new FormControl('', [Validators.required]);

  exiting: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogUserChangeUsernameComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private dialog: MatDialog,
              private userService: UserService,
              private errorHandleService: ErrorHandleService) {
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialog.open(SuccessDialogComponent, {
          data: {
            description: "Nazwa użytkownika została pomyślnie zmieniona"
          }
        });
      }
    });
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
