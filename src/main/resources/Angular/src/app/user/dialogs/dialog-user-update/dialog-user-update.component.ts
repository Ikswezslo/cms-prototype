import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../dialog-user-create/dialog-user-create.component";
import {UserService} from "../../../../assets/service/user.service";
import {ErrorHandleService} from "../../../../assets/service/error-handle.service";
import {RestError} from "../../../../assets/models/restError";
import {UserForm} from "../../../../assets/models/user";

@Component({
  selector: 'app-dialog-user-update',
  templateUrl: './dialog-user-update.component.html',
  styleUrls: ['./dialog-user-update.component.scss']
})
export class DialogUserUpdateComponent implements OnInit {

  form = new FormGroup({
    firstName: new FormControl(this.data.user?.firstName ?? "", [Validators.required]),
    lastName: new FormControl(this.data.user?.lastName ?? "", [Validators.required]),
    email: new FormControl(this.data.user?.email ?? "", [Validators.email]),
    phoneNumber: new FormControl(this.data.user?.phoneNumber ?? "", [Validators.pattern("^\\+?\\d{3,12}$")]),
    description: new FormControl(this.data.user?.description ?? "", []),
  });

  exiting: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogUserUpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private userService: UserService,
              private errorHandleService: ErrorHandleService) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  updateUser() {
    if (this.data.user) {
      this.exiting = true;

      let userData: UserForm = {} as UserForm;
      userData.firstName = this.form.controls.firstName.value ?? "";
      userData.lastName = this.form.controls.lastName.value ?? "";
      let email: string | null = this.form.controls.email.value;
      if (email) {
        userData.email = email;
      }
      let phoneNumber: string | null = this.form.controls.phoneNumber.value;
      if (phoneNumber) {
        userData.phoneNumber = phoneNumber;
      }

      let description: string | null = this.form.controls.description.value;
      if (description) {
        userData.description = description;
      }

      this.userService.editUser(this.data.user.id, userData).subscribe({
        next: result => {
          this.dialogRef.close(result);
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
