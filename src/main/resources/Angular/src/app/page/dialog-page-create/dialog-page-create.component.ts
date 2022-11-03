import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";
import {Page, PageForm} from "../../../assets/models/page";
import {PageService} from "../../../assets/service/page.service";
import {UserService} from "../../../assets/service/user.service";

@Component({
  selector: 'app-dialog-page-create',
  templateUrl: './dialog-page-create.component.html',
  styleUrls: ['./dialog-page-create.component.scss']
})
export class DialogPageCreateComponent implements OnInit {
  readonly page = {} as PageForm;
  titleValid = new FormControl('', Validators["required"]);
  descriptionValid = new FormControl('', Validators["required"]);
  creatorUsernameValid = new FormControl('', Validators["required"]);
  edit = false;

  constructor(public dialogRef: MatDialogRef<DialogPageCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private pageService: PageService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.page.content = "Insert content...";
    this.edit = this.data.edit ?? this.edit;
    this.page.creatorId = this.userService.loggedUser?.id ?? 0;
    if (this.edit) {
      this.page.id = this.data.page?.id ?? this.page.id;
      this.page.creatorId = this.data.page?.creator.id ?? this.page.creatorId;
      this.page.title = this.data.page?.title ?? this.page.title;
      this.page.description = this.data.page?.description ?? this.page.description;
      try {
        this.page.parentId = this.data.page?.parent.id ?? this.page.parentId;
      } catch (error) {
        this.page.parentId = 0;
      }
    } else {
      this.page.parentId = this.data.page?.id ?? this.page.parentId;
    }
  }

  createPage(): void {
    if (this.titleValid.status == "VALID" && this.descriptionValid.status == "VALID") {
      console.log(this.page);
      this.pageService.addNewPage(this.page).subscribe({
        next: page => {
          this.close(page.id);
        },
        error: err => {
          this.close();
        }
      });
    }
  }

  editPage(): void { //TODO: delete this method?
    if (this.titleValid.status == "VALID" && this.descriptionValid.status == "VALID" && this.creatorUsernameValid.status == "VALID") {
      console.log(this.page);
      this.pageService.editPage(this.page).subscribe({
        next: page => {
          console.log(page);
          this.close();
        },
        error: err => {
          this.close();
        }
      });
    }
  }

  close(id?: number) {
    if (id)
      this.dialogRef.close(id);
    else
      this.dialogRef.close();
  }
}

export interface DialogData {
  edit?: boolean;
  page?: Page;
}
