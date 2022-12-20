import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from 'src/app/dialog/error-dialog/error-dialog.component';
import {SuccessDialogComponent} from 'src/app/dialog/success-dialog/success-dialog.component';
import {ConfirmationDialogComponent} from "../../app/dialog/confirmation-dialog/confirmation-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog) {
  }

  openConfirmationDialog(description?: string) {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        description: description
      }
    });
  }

  openErrorDialog(description?: string) {
    return this.dialog.open(ErrorDialogComponent, {
      data: {
        description: description
      }
    });
  }

  openSuccessDialog(description?: string) {
    return this.dialog.open(SuccessDialogComponent, {
      data: {
        description: description
      }
    });
  }
}
