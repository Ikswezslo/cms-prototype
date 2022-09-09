import {Component, Input, OnInit} from '@angular/core';
import {Page} from "../../../assets/models/page";

@Component({
  selector: 'app-page-card',
  templateUrl: './page-card.component.html',
  styleUrls: ['./page-card.component.scss']
})
export class PageCardComponent implements OnInit {

  @Input() page?: Page;
  @Input() gray: boolean = false;
  @Input() goToBtn: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
