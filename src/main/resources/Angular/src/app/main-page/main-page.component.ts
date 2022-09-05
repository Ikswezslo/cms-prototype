import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {PageService} from "../../assets/service/page.service";
import {page} from "../../assets/models/page";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  pages: page[] = [];

  constructor(private http: HttpClient,
              private pageService: PageService) { }

  ngOnInit(): void {
    this.loadPages();
  }

  loadPages() {
    this.pageService.getNewPages()
      .subscribe(res => {
        this.pages = res;
      });
  }
}
