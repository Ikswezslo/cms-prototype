import {Component, Inject, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {UserService} from "../../../../assets/service/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogService} from "../../../../assets/service/dialog.service";
import {ErrorStateMatcher} from "@angular/material/core";
import {TranslateService} from "@ngx-translate/core";

export class PasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return (invalidCtrl || invalidParent) && control.touched;
  }
}

@Component({
  selector: 'app-dialog-user-change-password',
  templateUrl: './dialog-user-change-password.component.html',
  styleUrls: ['./dialog-user-change-password.component.scss']
})
export class DialogUserChangePasswordComponent implements OnInit {

  matcher = new PasswordErrorStateMatcher();

  form = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}")]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, {validators: this.checkPasswordsValidator()});

  pending: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogUserChangePasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private userService: UserService,
              private dialogService: DialogService,
              private translate: TranslateService) {
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
          this.dialogService.openSuccessDialog(this.translate.instant("PASSWORD_CHANGED"));
        }
      }
    });
  }

  ngOnInit(): void {
  }

  private checkPasswordsValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      let pass = group.get('newPassword')?.value;
      let confirmPass = group.get('confirmPassword')?.value
      return pass === confirmPass ? null : {notSame: true}
    };
  }

  changePassword(oldValue: string | null, newValue: string | null) {
    if (this.data.user && oldValue && newValue) {
      this.pending = true;
      this.userService.modifyUserPasswordField(this.data.user.id, {
        oldPassword: oldValue,
        newPassword: newValue
      }).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: () => {
          this.pending = false;
        }
      })
    }
  }
}
