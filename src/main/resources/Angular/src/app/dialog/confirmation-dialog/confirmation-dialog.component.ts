import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  title: String = this.translate.instant("CONFIRM");
  description: String = this.translate.instant("ARE_YOU_SURE");

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData,
    private translate: TranslateService) {
  }


  ngOnInit(): void {
    this.title = this.data.title ?? this.title;
    this.description = this.data.description ?? this.description;
  }

  save() {
    this.close(true)
  }

  close(data: any = false) {
    this.dialogRef.close(data);
  }

}

export interface ConfirmationDialogData {
  title?: String;
  description?: String;
}

//
//   let dialogData = {data: {}}
//   const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogData);
//   dialogRef.afterClosed().pipe(take(1)).subscribe({
//     next: res => {
//       if(res)
//     }
//   });
