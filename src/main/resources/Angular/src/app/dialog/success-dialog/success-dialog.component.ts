import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent implements OnInit {

  title: String = this.translate.instant("SUCCESS");
  description: String = this.translate.instant("SUCCESS_DESCRIPTION");

  constructor(@Inject(MAT_DIALOG_DATA) public data: SuccessDialogData,
              private translate: TranslateService) {
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
