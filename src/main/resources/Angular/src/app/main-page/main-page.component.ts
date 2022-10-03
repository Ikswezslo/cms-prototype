import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {PageService} from "../../assets/service/page.service";
import {Page} from "../../assets/models/page";
import {PageCardConfig} from "../page/page-card/page-card.component";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  pages: Page[] = [];

  cardConfig: PageCardConfig = {
    useSecondaryColor: false,
    showGoToButton: true,
    showDescription: false,
    showUniversity: true,
    showCreatedOn: false,
    showAuthor: true
  };

  constructor(private http: HttpClient,
              private pageService: PageService) {
  }

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
