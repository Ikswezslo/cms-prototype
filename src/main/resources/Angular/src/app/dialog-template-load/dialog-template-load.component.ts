import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Page} from "../../assets/models/page";
import {Template} from "../../assets/models/template";
import {FormGroup} from "@angular/forms";
import {DialogService} from "../../assets/service/dialog.service";
import {PageService} from "../../assets/service/page.service";

@Component({
  selector: 'app-dialog-template-load',
  templateUrl: './dialog-template-load.component.html',
  styleUrls: ['./dialog-template-load.component.scss']
})
export class DialogTemplateLoadComponent implements OnInit {
  form = new FormGroup({});
  page: Page;
  pending: boolean = false;
  template?: Template;

  constructor(public dialogRef: MatDialogRef<DialogTemplateLoadComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private dialogService: DialogService,
              private pageService: PageService) {
    this.page = data.page
  }

  ngOnInit(): void {
  }

  onTemplateChanged(template: Template) {
    this.template = template;
  }

  onSubmit() {
    this.dialogService.openConfirmationDialog("Czy na pewno chcesz wczytać szablon? Zastąpi on całą zawartość strony.")
      .afterClosed().subscribe(value => {
        if(value && this.template) {
          this.pending = true;
          this.pageService.modifyPageContentField(this.page.id, this.template.content).subscribe({
            next: () => {
              this.pending = false;
              this.dialogRef.close(this.template?.content)
            },
            error: () => {
              this.pending = false;
            }
          });
        }
      })
  }
}
