import {Component, OnInit} from '@angular/core';
import {PageService} from "../../assets/service/page.service";
import {Page} from "../../assets/models/page";
import {PageCardConfig} from "../page/page-card/page-card.component";
import {DialogService} from 'src/assets/service/dialog.service';
import {SpinnerService} from 'src/assets/service/spinner.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  pages: Page[] = [];

  cardConfig: PageCardConfig = {
    useSecondaryColor: false,
    showLink: true,
    showDescription: false,
    showUniversity: false,
    showCreatedOn: false,
    showAuthor: false
  };

  constructor(private dialogService: DialogService,
              private spinnerService: SpinnerService,
              private pageService: PageService) {}

  ngOnInit(): void {
    this.loadPages();
  }

  loadPages() {
    this.spinnerService.show();
    this.pageService.getMainPages()
      .subscribe({
        next: res => {
          this.pages = res;
          this.spinnerService.hide();
        },
        error: err => {
          this.spinnerService.hide();
          if (err.status !== 401)
            this.dialogService.openDataErrorDialog();
        }
      });
  }
}
