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


  openErrorDialog() {
    let dialogData = {
      data: {
        title: "Error",
        description: "Wystąpił błąd przy pobieraniu danych"
      }
    }
    const dialogRef = this.dialog.open(ErrorDialogComponent, dialogData);
  }
}
