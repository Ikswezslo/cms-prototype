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
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    public dialogRef: MatDialogRef<DialogUserCreateComponent>,
  ) {
    
  }

  ngOnInit(): void {
  }

  createUser(): void {
    console.log(this.user);
    this.userService.createUser(this.user).subscribe({
      next: user => console.log(user),
      error: error => RestErrorHandler.handleError(RestErrorHandler.prepareError(error))
    });
    this.close();
  }
  close() {
    this.dialog.closeAll()
  }
}
