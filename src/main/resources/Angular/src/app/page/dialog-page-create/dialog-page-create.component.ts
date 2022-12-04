import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Page, PageForm} from "../../../assets/models/page";
import {PageService} from "../../../assets/service/page.service";
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "../../../assets/service/user.service";
import {DialogService} from "../../../assets/service/dialog.service";
import {Template} from "../../../assets/models/template";

@Component({
  selector: 'app-dialog-page-create',
  templateUrl: './dialog-page-create.component.html',
  styleUrls: ['./dialog-page-create.component.scss']
})
export class DialogPageCreateComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
  });

  parentPage?: Page;
  template?: Template;
  exiting: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogPageCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private pageService: PageService,
              private userService: UserService,
              private dialogService: DialogService,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.parentPage = this.data.page;
  }

  createPage(): void {
    let pageData: PageForm = {
      title: this.form.controls.title.value,
      description: this.form.controls.description.value,
      content: this.template?.content,
      creatorId: this.userService.loggedUser?.id,
      parentId: this.parentPage?.id
    } as PageForm

    this.exiting = true;

    this.pageService.addNewPage(pageData).subscribe({
      next: page => {
        this.dialogService.openSuccessDialog(this.translate.instant("ADDED_PAGE"));
        this.dialogRef.close(page.id);
      },
      error: err => {
        this.exiting = false;
        if (err.status === 400) {
          this.dialogService.openDataErrorDialog(err.message);
        }
      }
    });
  }

  onTemplateChanged(template?: Template) {
    this.template = template;
  }
}
