import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageService } from 'src/assets/service/page.service';

@Component({
  selector: 'app-edit-page-key-words',
  templateUrl: './edit-page-key-words.component.html',
  styleUrls: ['./edit-page-key-words.component.scss']
})
export class EditPageKeyWordsComponent implements OnInit {

  listOfKeyWords: string[] = [];
  form = new FormGroup({});

  constructor(
    private pageService: PageService,
    public dialogRef: MatDialogRef<EditPageKeyWordsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditPageKeyWordsData) { }

  ngOnInit(): void {
    this.listOfKeyWords = this.data.keyWords.length > 0 ? this.data.keyWords.split(',') : [];
  }

  onKeyWordsChanged(keyWords?: string[]) {
    this.listOfKeyWords = keyWords ?? [];
  }

  changeKeyWords(){
    this.pageService.changeKeyWords(this.data.id, this.listOfKeyWords.join(',')).subscribe();
    this.close();
  }


  close(add: Boolean = false) {
    if (add)
      this.dialogRef.close(add);
    else
      this.dialogRef.close();
  }
}


export interface EditPageKeyWordsData{
  id: number;
  keyWords: string;
}
