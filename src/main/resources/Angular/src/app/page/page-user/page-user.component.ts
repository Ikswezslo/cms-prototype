import {Component, OnInit} from '@angular/core';
import {PageService} from "../../../assets/service/page.service";
import {Page} from "../../../assets/models/page";
import {ActivatedRoute} from "@angular/router";
import { ErrorHandleService } from 'src/assets/service/error-handle.service';
import { SpinnerService } from 'src/assets/service/spinner.service';


@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.scss']
})
export class PageUserComponent implements OnInit {
  pages: Page[] = [];
  public id: Number = 0;

  constructor(private route: ActivatedRoute,
              private spinnerService: SpinnerService,
              private errorHandleService: ErrorHandleService,
              private pageService: PageService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('userId'));
    this.loadPages(this.id);
  }

  loadPages(userId: Number) {
    this.spinnerService.show();
    this.pageService.getPages()
      .subscribe({
        next: res => {
          this.spinnerService.hide();
          this.pages = res.filter(element => element.creator.id == userId);
        },
        error: err => {
          this.spinnerService.hide();
          this.errorHandleService.openDataErrorDialog()
        }
      })
  }
}
