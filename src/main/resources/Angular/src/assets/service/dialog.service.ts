import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from 'src/app/dialog/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/dialog/success-dialog/success-dialog.component';
import {ConfirmationDialogComponent} from "../../app/dialog/confirmation-dialog/confirmation-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
// TODO: Add all dialogs from dialog dir
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

  openDataErrorDialog(description: string | undefined = undefined) {
    let dialogData: any;

    if (description) {
      dialogData = {
        data: {
          description: description
        }
      }
    } else {
      dialogData = {data: {}}
    }

    const dialogRef = this.dialog.open(ErrorDialogComponent, dialogData);
  }

  openSuccessDialog(description: string | undefined = undefined) {
    let dialogData: any;

    if (description) {
      dialogData = {
        data: {
          description: description
        }
      }
    } else { 
      dialogData = { data: {} }
    }
    
    const dialogRef = this.dialog.open(SuccessDialogComponent, dialogData);
  }

  openLoggedUserErrorDialog() {
    let dialogData = {
      data: {
        description: "Nie udało się pobrać zalogowanego użytkownika."
      }
    }
    const dialogRef = this.dialog.open(ErrorDialogComponent, dialogData);
  }
}
