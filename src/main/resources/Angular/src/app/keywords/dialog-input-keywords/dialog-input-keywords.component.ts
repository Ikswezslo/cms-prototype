import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Keyword } from 'src/assets/models/keywords';

@Component({
  selector: 'app-dialog-input-keywords',
  templateUrl: './dialog-input-keywords.component.html',
  styleUrls: ['./dialog-input-keywords.component.scss']
})
export class DialogInputKeywordsComponent implements OnInit {
  form = new FormGroup({});
  keyWordsControl = new FormControl<string>('');
  keyword: Keyword = { id: -1, word: "" };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogInputKeywordData,
    public dialogRef: MatDialogRef<DialogInputKeywordsComponent>) { }

  ngOnInit(): void {
    if(this.data?.keyword)
      this.keyword = this.data.keyword;
  }

  save() {
    this.dialogRef.close(this.keyword)
  }

  close() {
      this.dialogRef.close();
  }

}

export interface DialogInputKeywordData {
  keyword?: Keyword;
}
