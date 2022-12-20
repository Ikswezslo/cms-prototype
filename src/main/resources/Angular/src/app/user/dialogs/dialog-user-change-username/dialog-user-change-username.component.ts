import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../assets/service/user.service";
import {DialogService} from "../../../../assets/service/dialog.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-dialog-user-change-username',
  templateUrl: './dialog-user-change-username.component.html',
  styleUrls: ['./dialog-user-change-username.component.scss']
})
export class DialogUserChangeUsernameComponent implements OnInit {

  usernameControl = new FormControl('', [Validators.required]);
  pending: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogUserChangeUsernameComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private userService: UserService,
              private dialogService: DialogService,
              private translate: TranslateService) {
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
          this.dialogService.openSuccessDialog(this.translate.instant("USERNAME_CHANGED"));
        }
      }
    });
  }

  ngOnInit(): void {
  }

  changeUsername(username: string | null) {
    if (this.data.user && username) {
      this.pending = true;
      this.userService.modifyUserUsernameField(this.data.user.id, username).subscribe({
        next: () => {
          if (this.data.user) {
            this.data.user.username = username;
          }
          this.dialogRef.close(true);
        },
        error: () => {
          this.pending = false;
        }
      })
    }
  }
}
