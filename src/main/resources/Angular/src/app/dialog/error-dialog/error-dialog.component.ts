import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {


  title: String = this.translate.instant("ERROR");
  description: String = this.translate.instant("LOADING_ERROR_DESCRIPTION");

  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ErrorDialogData,
    private translate: TranslateService) {}

  ngOnInit(): void {
    this.title = this.data.title ?? this.title;
    this.description = this.data.description ?? this.description;
  }

  close() {
    this.dialogRef.close();
  }

}

export interface ErrorDialogData {
  title?: String;
  description?: String;
}
