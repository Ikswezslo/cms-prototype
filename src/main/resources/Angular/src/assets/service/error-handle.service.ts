import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/dialog/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/dialog/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandleService {

  constructor(
    public dialog: MatDialog) { }


  openDataErrorDialog() {
    let dialogData = {data: {}}
    const dialogRef = this.dialog.open(ErrorDialogComponent, dialogData);
  }

  openLoggedUserErrorDialog() {
    let dialogData = {
      data: {
        description : "Nie udało się pobrać zalogowanego użytkownika."
    }}
    const dialogRef = this.dialog.open(ErrorDialogComponent, dialogData);
  }
}
