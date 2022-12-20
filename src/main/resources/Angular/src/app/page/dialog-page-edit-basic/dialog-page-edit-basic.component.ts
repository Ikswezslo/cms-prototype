import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PageService} from "../../../assets/service/page.service";
import {FormControl, Validators} from "@angular/forms";
import {PageUpdateForm} from "../../../assets/models/page";
import {DialogService} from "../../../assets/service/dialog.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-dialog-page-edit-base',
  templateUrl: './dialog-page-edit-basic.component.html',
  styleUrls: ['./dialog-page-edit-basic.component.scss']
})
export class DialogPageEditBasicComponent implements OnInit {
  titleValid = new FormControl('', Validators["required"]);
  descriptionValid = new FormControl('', Validators["required"]);

  pageId: number = 0;
  title: string = "";
  description: string = "";

  constructor(public dialogRef: MatDialogRef<DialogPageEditBasicComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private dialogService: DialogService,
              private pageService: PageService,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.pageId = this.data.id as number;
    this.title = this.data.title as string;
    this.description = this.data.description as string;
  }

  close(add: Boolean = false) {
    if (add)
      this.dialogRef.close(add);
    else
      this.dialogRef.close();
  }

  changePageInformation() {
    if (this.descriptionValid.status == 'VALID' && this.titleValid.status == 'VALID') {
      let pageData: PageUpdateForm = {
        title: this.title,
        description: this.description
      } as PageUpdateForm
      this.pageService.editPage(this.pageId, pageData).subscribe({
          next: () => {
            this.close();
            this.dialogService.openSuccessDialog(this.translate.instant("INFORMATION_CHANGED"));
          },
          error: () => {
            this.close();
          }
        }
      );

    }
  }
}

export interface DialogData {
  id?: number;
  title?: string;
  description?: string;
}
