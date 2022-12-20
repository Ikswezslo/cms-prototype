import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
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
              private templateService: TemplateService) {
    dialogRef.disableClose = true;
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
        error: () => {
          this.pending = false;
        }
      })
    }
  }

}
