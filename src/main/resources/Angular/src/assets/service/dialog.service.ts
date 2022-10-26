import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from 'src/app/dialog/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog) {
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

  openLoggedUserErrorDialog() {
    let dialogData = {
      data: {
        description: "Nie udało się pobrać zalogowanego użytkownika."
      }
    }
    const dialogRef = this.dialog.open(ErrorDialogComponent, dialogData);
  }
}
