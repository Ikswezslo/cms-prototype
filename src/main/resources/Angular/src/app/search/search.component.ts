import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Page } from 'src/assets/models/page';
import { PageService } from 'src/assets/service/page.service';
import { PageCardConfig } from '../page/page-card/page-card.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private pageService: PageService) { }

  searchControl = new FormControl<string>('', [this.objectTypeValidator()]);
  pages: Page[] = [];
  
  cardConfig: PageCardConfig = {
    useSecondaryColor: false,
    showGoToButton: true,
    showDescription: false,
    showUniversity: true,
    showCreatedOn: false,
    showAuthor: true
  };
  
  ngOnInit(): void {
  }

  private objectTypeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = typeof control.value === "object";
      return valid ? null : {forbiddenType: {value: control.value}};
    };
  }

  search() {
    this.pageService.searchPages(this.searchControl.value ?? '').subscribe({
      next: pages => {
        this.pages = pages;
      },
      error: err => {}
    });
  }

}
