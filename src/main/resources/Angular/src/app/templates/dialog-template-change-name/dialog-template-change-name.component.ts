import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TemplateService} from "../../../assets/service/template.service";
import {DialogTemplateCreateComponent} from "../dialog-template-create/dialog-template-create.component";

@Component({
  selector: 'app-dialog-template-change-name',
  templateUrl: './dialog-template-change-name.component.html',
  styleUrls: ['./dialog-template-change-name.component.scss']
})
export class DialogTemplateChangeNameComponent implements OnInit {

  nameControl = new FormControl('', [Validators.required]);

  pending: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogTemplateCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private templateService: TemplateService) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  renameTemplate(name: string | null) {
    if (name && this.data.id) {
      this.pending = true;
      this.templateService.modifyTemplateNameField(this.data.id, name).subscribe({
        next: () => {
          this.dialogRef.close(name);
        },
        error: () => {
          this.pending = false;
        }
      })
    }
  }

}
