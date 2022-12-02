import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../assets/service/user.service";
import {DialogService} from "../../../../assets/service/dialog.service";
import {SuccessDialogComponent} from "../../../dialog/success-dialog/success-dialog.component";
import {TranslateService} from "@ngx-translate/core";

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
              private dialogService: DialogService,
              private translate: TranslateService) {
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
          this.dialogService.openSuccessDialog(this.translate.instant("USERNAME_CHANGED"));
        }
      },
      error: err => {
        this.dialogService.openDataErrorDialog(this.translate.instant("USERNAME_CHANGED_ERROR"));
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
          this.exiting = false;
          if (err.status === 400) {
            this.dialogService.openDataErrorDialog(err.message);
          }
        }
      })
    }
  }
}
