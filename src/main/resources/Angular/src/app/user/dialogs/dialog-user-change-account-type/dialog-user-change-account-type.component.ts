import {Component, Inject, OnInit} from '@angular/core';
import {SuccessDialogComponent} from "../../../dialog/success-dialog/success-dialog.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../assets/service/user.service";
import {DialogService} from "../../../../assets/service/dialog.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-user-change-account-type',
  templateUrl: './dialog-user-change-account-type.component.html',
  styleUrls: ['./dialog-user-change-account-type.component.scss']
})
export class DialogUserChangeAccountTypeComponent implements OnInit {

  accountTypeControl = new FormControl(this.data.user?.accountType ?? "", [Validators.required]);

  exiting: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogUserChangeAccountTypeComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private dialog: MatDialog,
              private userService: UserService,
              private errorHandleService: DialogService) {
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialog.open(SuccessDialogComponent, {
          data: {
            description: "Rola została pomyślnie zmieniona"
          }
        });
      }
    });
  }

  ngOnInit(): void {
  }

  changeAccountType(accountType: string | null) {
    if (this.data.user && accountType) {
      this.exiting = true;
      this.userService.modifyUserAccountTypeField(this.data.user.id, accountType).subscribe({
        next: () => {
          if (this.data.user) {
            this.data.user.accountType = accountType;
          }
          this.dialogRef.close(true);
        },
        error: err => {
          this.exiting = false;
          if (err.status === 400) {
            this.errorHandleService.openDataErrorDialog(err.message);
          }
        }
      })
    }
  }
}
