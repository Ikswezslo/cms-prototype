import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Page} from "../../../assets/models/page";
import {Template} from "../../../assets/models/template";
import {FormGroup} from "@angular/forms";
import {DialogService} from "../../../assets/service/dialog.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-dialog-template-load',
  templateUrl: './dialog-template-load.component.html',
  styleUrls: ['./dialog-template-load.component.scss']
})
export class DialogTemplateLoadComponent implements OnInit {
  form = new FormGroup({});
  page: Page;
  template?: Template;

  constructor(public dialogRef: MatDialogRef<DialogTemplateLoadComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private dialogService: DialogService,
              private translate: TranslateService) {
    dialogRef.disableClose = true;
    this.page = data.page
  }

  ngOnInit(): void {
  }

  onTemplateChanged(template: Template) {
    this.template = template;
  }

  onSubmit() {
    this.dialogService.openConfirmationDialog(this.translate.instant("TEMPLATE.LOAD_CONFIRM_DESCRIPTION"))
      .afterClosed().subscribe(value => {
      if (value && this.template) {
        this.dialogRef.close(this.template.content ?? "")
      }
    })
  }
}
