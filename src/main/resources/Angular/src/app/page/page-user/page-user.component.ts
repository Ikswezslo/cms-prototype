import {Component, OnInit} from '@angular/core';
import {PageService} from "../../../assets/service/page.service";
import {Page} from "../../../assets/models/page";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.scss']
})
export class PageUserComponent implements OnInit {
  pages: Page[] = [];
  public id: Number = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pageService: PageService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('userId'));
    this.loadPages(this.id);
  }

  loadPages(userId: Number) {
    this.pageService.getPages()
      .subscribe(res => {
        this.pages = res.filter(element => element.creator.id == userId);
      });
  }
}
