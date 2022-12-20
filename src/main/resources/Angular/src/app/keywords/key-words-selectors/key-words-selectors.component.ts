import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { KeyWordsService } from 'src/assets/service/key-words.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { SpinnerService } from 'src/assets/service/spinner.service';

@Component({
  selector: 'app-key-words-selectors',
  templateUrl: './key-words-selectors.component.html',
  styleUrls: ['./key-words-selectors.component.scss']
})
export class KeyWordsSelectorsComponent implements OnInit {

  @Input() form?: FormGroup;
  @Input() keyWords?: string[];
  @Output() keyWordsChanged = new EventEmitter<string[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  keyWordsControl = new FormControl<string>('');
  selectedKeyWords: string[] = [];
  filteredKeyWords!: Observable<string[]>;
  allKeyWords: string[] = [];
  constructor(
    private keyWordsService: KeyWordsService,
    private spinnerService: SpinnerService) {
    this.filteredKeyWords = this.keyWordsControl.valueChanges.pipe(
      startWith(null),
      map((keyWord: string | null) => (keyWord ? this._filter(keyWord) : this.allKeyWords.slice())),
    );
  }

  ngOnInit(): void {
    if (this.keyWords) {
      this.selectedKeyWords = this.keyWords;
    }
    this.loadKeyWords();
    this.keyWordsControl.statusChanges.subscribe(() => {
      let value: string[] = this.selectedKeyWords;
      this.keyWordsChanged.emit(value);
    })

    if (this.form) {
      this.form.addControl("keyWords", this.keyWordsControl);
    }
  }

  loadKeyWords() {
    this.spinnerService.show();

    this.keyWordsService.getAllKeyWords().subscribe({
      next: res => {
        this.allKeyWords = res.map(keyWord => keyWord['word']);
        this.spinnerService.hide();
      },
      error: () => this.spinnerService.hide()
      });
  }

  add(event: MatChipInputEvent): void {
    this.addToSelected((event.value || '').trim())

    event.chipInput!.clear();
    this.keyWordsControl.setValue(null);
  }

  remove(keyWord: string): void {
    const index = this.selectedKeyWords.indexOf(keyWord);

    if (index >= 0) {
      this.selectedKeyWords.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.addToSelected(event.option.viewValue)
    this.keyWordsControl.setValue(null);
  }

  addToSelected(value) {
    if (!this.selectedKeyWords.includes(value) && this.allKeyWords.includes(value)) {
      this.selectedKeyWords.push(value);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allKeyWords.filter(option => option.toLowerCase().includes(filterValue) && !this.selectedKeyWords.includes(option));
  }
}
