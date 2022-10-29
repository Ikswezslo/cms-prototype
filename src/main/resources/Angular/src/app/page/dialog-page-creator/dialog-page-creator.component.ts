import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PageService} from "../../../assets/service/page.service";

@Component({
  selector: 'app-dialog-page-creator',
  templateUrl: './dialog-page-creator.component.html',
  styleUrls: ['./dialog-page-creator.component.scss']
})
export class DialogPageCreatorComponent implements OnInit {
  creatorUsernameValid = new FormControl('', Validators["required"]);
  pageId: number = 0;
  creatorUsername: string = "";

  constructor(public dialogRef: MatDialogRef<DialogPageCreatorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private pageService: PageService) { }

  ngOnInit(): void {
    this.pageId = this.data.id as number;
    this.creatorUsername = this.data.username as string;
  }

  changePageCreator(){
    if(this.creatorUsernameValid.status == "VALID"){
      this.pageService.changePageCreator(this.pageId, this.creatorUsername).subscribe();
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

export interface DialogData {
  id?: number;
  username?: string;
}
