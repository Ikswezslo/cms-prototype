import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageService} from "../../assets/service/page.service";
import { Page } from "../../assets/models/page";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  pages: Page[] = [];

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
