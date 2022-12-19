import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Keyword } from 'src/assets/models/keywords';
import { DialogService } from 'src/assets/service/dialog.service';
import { KeyWordsService } from 'src/assets/service/key-words.service';
import { SpinnerService } from 'src/assets/service/spinner.service';
import { UserService } from 'src/assets/service/user.service';
import { DialogInputKeywordsComponent } from '../dialog-input-keywords/dialog-input-keywords.component';

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.scss']
})
export class KeywordsComponent implements OnInit {

  public selectedKeyword: Keyword = {id: -1, word: ""};
  public allKeyWords: Keyword[] = [];
  isEditMode: boolean = false;

  constructor(
    private dialogService: DialogService,
    private keyWordsService: KeyWordsService,
    public userService: UserService,
    private spinnerService: SpinnerService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadKeyWords();
  }

  loadKeyWords() {
    this.spinnerService.show();

    this.keyWordsService.getAllKeyWords().subscribe({
      next: res => {
        this.allKeyWords = res;
        this.spinnerService.hide();
      },
      error: err => {
        this.spinnerService.hide();
        if (err.status !== 401)
          this.dialogService.openDataErrorDialog();
      }
    });
  }

  onKeywordClicked(id: number) {
    this.selectedKeyword = this.allKeyWords.find(keyword => keyword.id == id) ?? this.selectedKeyword;
  }

  onAddKeyword() {
    const dialogRef = this.dialog.open(DialogInputKeywordsComponent);

    dialogRef.afterClosed().subscribe(next => {
      if (next) {
        this.spinnerService.show();
        this.keyWordsService.addKeyWord(next.word).subscribe({
          next: () => {
            this.spinnerService.hide();
            this.loadKeyWords();
          },
          error: err => {
            this.spinnerService.hide();
            if (err.status !== 401)
              this.dialogService.openDataErrorDialog();
          }
        })
      }
    })

  }

  onEditKeyword() {
    if (this.selectedKeyword.id < 0)
      return
    const dialogRef = this.dialog.open(DialogInputKeywordsComponent, {
      data: {
        keyword: this.selectedKeyword
      }
    });

    dialogRef.afterClosed().subscribe(next => {
      if (next) {
        this.spinnerService.show();
        this.keyWordsService.modifyKeyWordWordField(next.id, next.word).subscribe({
          next: () => {
            this.spinnerService.hide();
            this.loadKeyWords();
          },
          error: err => {
            this.spinnerService.hide();
            if (err.status !== 401)
              this.dialogService.openDataErrorDialog();
          }
        })
      }
    })

  }

  onDeleteKeyword() {
    console.log(this.selectedKeyword.id);
    if (this.selectedKeyword.id < 0)
      return;
    
    this.dialogService.openConfirmationDialog().afterClosed().subscribe(value => {
      if (value && this.selectedKeyword) {
        this.spinnerService.show();
        this.allKeyWords = this.allKeyWords.filter(keyword => {
          return keyword.id !== this.selectedKeyword?.id;
        })
        this.keyWordsService.deleteKeyWord(this.selectedKeyword.id).subscribe({
          next: () => {
            this.selectedKeyword.id = -1;
            this.spinnerService.hide();
          }, error: err => {
            this.spinnerService.hide();
            if (err.status !== 401)
              this.dialogService.openDataErrorDialog();
          }
        });
      }
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }
}
