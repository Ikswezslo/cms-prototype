import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { KeyWordsService } from 'src/assets/service/key-words.service';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-key-words-selectors',
  templateUrl: './key-words-selectors.component.html',
  styleUrls: ['./key-words-selectors.component.scss']
})
export class KeyWordsSelectorsComponent implements OnInit {

  @Input() form?: FormGroup;
  @Output() keyWordsChanged = new EventEmitter<string[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  keyWordsControl = new FormControl<string>('', [this.objectTypeValidator()]);
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  allOptions: string[] = [];
  constructor(private keyWordsService: KeyWordsService) { }

  ngOnInit(): void {
    console.log("XXX")
    this.loadKeyWords();
    this.keyWordsControl.statusChanges.subscribe(status => {
      if (status === "VALID") {
        let value: string[] = this.options;
        this.keyWordsChanged.emit(value);
      } else {
        this.keyWordsChanged.emit(undefined);
      }
    })

    if (this.form) {
      this.form.addControl("keyWords", this.keyWordsControl);
    }
  }

  private objectTypeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = typeof control.value === "object";
      return valid ? null : { forbiddenType: { value: control.value } };
    };
  }

  loadKeyWords() {
    this.keyWordsService.getAllKeyWords()
      .subscribe(res => {
        this.allOptions = res.map(keyWord => keyWord['word']);
        this.filteredOptions = this.keyWordsControl.valueChanges.pipe(
          startWith(null),
          map((keyWord: string | null) => (keyWord ? this._filter(keyWord) : this.allOptions.slice())),
        );
        this.keyWordsControl.setValue('');
      });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.options.push(value);
    }

    event.chipInput!.clear();

    this.keyWordsControl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.options.indexOf(fruit);

    if (index >= 0) {
      this.options.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.options.push(event.option.viewValue);
    this.keyWordsControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
}
