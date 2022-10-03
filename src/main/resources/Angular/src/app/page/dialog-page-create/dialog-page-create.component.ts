import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";
import {PageForm} from "../../../assets/models/page";
import {PageService} from "../../../assets/service/page.service";

@Component({
  selector: 'app-dialog-page-create',
  templateUrl: './dialog-page-create.component.html',
  styleUrls: ['./dialog-page-create.component.scss']
})
export class DialogPageCreateComponent implements OnInit {
  readonly page = {} as PageForm;
  titleValid = new FormControl('', Validators["required"]);
  descriptionValid = new FormControl('', Validators["required"]);

  constructor(public dialogRef: MatDialogRef<DialogPageCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {parentId: number},
              private pageService: PageService) { }

  ngOnInit(): void {
    this.page.creatorUsername = "admin";  //TODO: Pobrać aktualnego użytkownika skądś
    this.page.content = "Content";
  }

  createPage(): void {
    if(this.titleValid.status == "VALID" && this.descriptionValid.status == "VALID"){
      this.page.parentId = this.data.parentId;
      console.log(this.page);
      this.pageService.addNewPage(this.page).subscribe({next: page => console.log(page)});
      this.close();
    }
  }

  close(add: Boolean = false) {
    if (add)
      this.dialogRef.close(add);
    else
      this.dialogRef.close();
  }

}
