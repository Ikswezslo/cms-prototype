import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  title!: String;
  description!: String;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {}

  
  ngOnInit(): void {
    this.title = this.data.title;
    this.description = this.data.description;
  }

  save() {
    this.close("save")
  }
  close(data?: any) {
    if (data)
      this.dialogRef.close(data);
    this.dialogRef.close();
  }

}
export interface ConfirmationDialogData {
  title: String;
  description: String;
}