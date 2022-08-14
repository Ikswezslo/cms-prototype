import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { page } from '../models/page';
import { PageService } from '../service/page.service';

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.scss']
})
export class PageDetailsComponent implements OnInit {

  public page!: page;
  public id: Number = 0;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService) { 
  }

  ngOnInit(): void{
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('pageId'));
    this.loadPage();
  }

  loadPage() {
    this.pageService.getPage(this.id)
    .subscribe(res => {
      this.page = res;
    });
  }

}
