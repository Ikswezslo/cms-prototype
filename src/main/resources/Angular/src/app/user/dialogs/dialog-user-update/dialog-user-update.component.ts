import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../assets/service/user.service";
import {UserForm} from "../../../../assets/models/user";
import {TranslateService} from "@ngx-translate/core";
import {DialogService} from "../../../../assets/service/dialog.service";

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
    phoneNumber: new FormControl(this.data.user?.phoneNumber ?? "", [Validators.pattern("^(\\+?\\d{3,12})?$")]),
    description: new FormControl(this.data.user?.description ?? "", []),
  });

  pending: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogUserUpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private userService: UserService,
              private dialogService: DialogService,
              private translate: TranslateService) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  updateUser() {
    if (this.data.user) {
      this.pending = true;

      let userData: UserForm = {
        firstName: this.form.controls.firstName.value,
        lastName: this.form.controls.lastName.value,
        email: this.form.controls.email.value,
        phoneNumber: this.form.controls.phoneNumber.value,
        description: this.form.controls.description.value,
      } as UserForm;

      this.userService.editUser(this.data.user.id, userData).subscribe({
        next: result => {
          this.dialogService.openSuccessDialog(this.translate.instant("EDIT_USER_SUCCESS"));
          this.dialogRef.close(result);
        },
        error: () => {
          this.pending = false;
        }
      })
    }
  }
}
