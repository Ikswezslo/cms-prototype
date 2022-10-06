import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent implements OnInit {

  title: String = "Success";
  description: String = "Operacja została zakończona pomyślnie.";

  constructor(@Inject(MAT_DIALOG_DATA) public data: SuccessDialogData) {
  }

  ngOnInit(): void {
    this.title = this.data.title ?? this.title;
    this.description = this.data.description ?? this.description;
  }
}

export interface SuccessDialogData {
  title?: String;
  description?: String;
}
