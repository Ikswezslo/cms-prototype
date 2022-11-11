import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../assets/service/user.service";
import {DialogService} from "../../../assets/service/dialog.service";
import {TranslateService} from "@ngx-translate/core";
import {SuccessDialogComponent} from "../../dialog/success-dialog/success-dialog.component";
import {TemplateService} from "../../../assets/service/template.service";

@Component({
  selector: 'app-dialog-template-create',
  templateUrl: './dialog-template-create.component.html',
  styleUrls: ['./dialog-template-create.component.scss']
})
export class DialogTemplateCreateComponent implements OnInit {

  nameControl = new FormControl('', [Validators.required]);

  pending: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogTemplateCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private dialog: MatDialog,
              private templateService: TemplateService,
              private dialogService: DialogService,
              private translate: TranslateService) {
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  ngOnInit(): void {
  }

  createTemplate(name: string | null) {
    if (name) {
      this.pending = true;
      this.templateService.addTemplate(name).subscribe({
        next: res => {
          this.dialogRef.close(res);
        },
        error: err => {
          this.pending = false;
          if (err.status === 400) {
            this.dialogService.openDataErrorDialog(err.message);
          }
        }
      })
    }
  }

}
