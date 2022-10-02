import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {PageService} from "../../assets/service/page.service";
import {Page} from "../../assets/models/page";
import {PageCardConfig} from "../page/page-card/page-card.component";
import { ErrorHandleService } from 'src/assets/service/error-handle.service';
import { SpinnerService } from 'src/assets/service/spinner.service';

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

  constructor(private errorHandleService: ErrorHandleService,
              private spinnerService: SpinnerService,
              private pageService: PageService) {
  }

  ngOnInit(): void {
    this.loadPages();
  }

  loadPages() {
    this.spinnerService.show();
    this.pageService.getNewPages()
      .subscribe({
        next: res => {
          this.pages = res;
          this.spinnerService.hide();
        },
        error: err => {
          this.spinnerService.hide();
          if (err.status != "401")
            this.errorHandleService.openDataErrorDialog();
        }
      });
  }
}
