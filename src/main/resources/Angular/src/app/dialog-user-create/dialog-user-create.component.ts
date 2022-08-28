import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestErrorHandler } from 'src/assets/models/restError';
import { UserForm } from 'src/assets/models/user';
import { UserService } from 'src/assets/service/user.service';

@Component({
  selector: 'app-dialog-user-create',
  templateUrl: './dialog-user-create.component.html',
  styleUrls: ['./dialog-user-create.component.scss']
})
export class DialogUserCreateComponent implements OnInit {

  readonly user = {} as UserForm;
  usernameValid = new FormControl('', [Validators.required]);
  passwordValid = new FormControl('', [Validators.required]);
  accountTypeValid = new FormControl('', [Validators.required]);
  emailValid = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    public dialogRef: MatDialogRef<DialogUserCreateComponent>,
  ) {}

  ngOnInit(): void {
  }

  createUser(): void {
    console.log(this.user);
    if (this.usernameValid.status == "VALID" && this.passwordValid.status == "VALID" &&
        this.emailValid.status == "VALID" && this.accountTypeValid.status == "VALID") {
      this.userService.createUser(this.user).subscribe({
        next: user => console.log(user),
        error: error => RestErrorHandler.handleError(RestErrorHandler.prepareError(error))
      });
      this.close();
    } 
  }

  close() {
    this.dialog.closeAll()
  }

  getErrorMessage() {
    if (this.emailValid.hasError('required')) return 'You must enter a value';
    else if (this.emailValid.hasError('email')) return 'Not a valid email';
    return '';
  }
}
