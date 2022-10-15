import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {UserForm} from 'src/assets/models/user';
import {UserService} from 'src/assets/service/user.service';
import {DialogService} from "../../../../assets/service/dialog.service";

@Component({
  selector: 'app-dialog-user-create',
  templateUrl: './dialog-user-create.component.html',
  styleUrls: ['./dialog-user-create.component.scss']
})
export class DialogUserCreateComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}")]),
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.email]),
    phoneNumber: new FormControl("", [Validators.pattern("^\\+?\\d{3,12}$")]),
    accountType: new FormControl("", [Validators.required]),
  });
  hide = true;

  exiting: boolean = false;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<DialogUserCreateComponent>,
    private errorHandleService: DialogService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  createUser(): void {
    this.exiting = true;

    let userData: UserForm = {
      username: this.form.controls.username.value,
      password: this.form.controls.password.value,
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      email: this.form.controls.email.value,
      phoneNumber: this.form.controls.phoneNumber.value,
      accountType: this.form.controls.accountType.value
    } as UserForm;

    this.userService.createUser(userData).subscribe({
      next: result => {
        this.dialogRef.close(result);
      },
      error: err => {
        this.exiting = false;
        if (err.status === 400) {
          this.errorHandleService.openDataErrorDialog(err.message);
        }
      }
    });
  }
}
