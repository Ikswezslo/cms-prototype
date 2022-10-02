import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {


  title: String = "Error";
  description: String = "Wystąpił błąd przy pobieraniu danych.";

  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ErrorDialogData) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.description = this.data.description;
  }

  close() {
    this.dialogRef.close();
  }

}

export interface ErrorDialogData {
  title: String;
  description: String;
}