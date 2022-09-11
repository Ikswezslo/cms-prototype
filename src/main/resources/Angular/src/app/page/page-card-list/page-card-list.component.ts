import { Component, Input, OnInit } from '@angular/core';
import { Page } from 'src/assets/models/page';

@Component({
  selector: 'app-page-card-list',
  templateUrl: './page-card-list.component.html',
  styleUrls: ['./page-card-list.component.scss']
})
export class PageCardListComponent implements OnInit {
  @Input() pages!: Page[];
  @Input() description: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  
}
