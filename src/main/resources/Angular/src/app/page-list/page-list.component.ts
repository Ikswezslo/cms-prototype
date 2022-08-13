import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { page } from '../models/page';
import { PageService } from '../service/page.service';


@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {

  pages: page[] = [];
  public selected = false;

  constructor(
    private http: HttpClient,
    private pageService: PageService) {}

  ngOnInit(): void {
    this.loadPages();
  }

  loadPages(showHidden: Boolean = false) {
    this.pageService.getPages()
      .subscribe(res => {
        this.pages = showHidden ? res : res.filter(element => !element.hidden);
    });
  }
}
