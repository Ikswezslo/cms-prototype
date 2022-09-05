import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/assets/models/page';
import { PageService } from '../../../assets/service/page.service';

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.scss']
})
export class PageDetailsComponent implements OnInit {

  public page!: Page;
  public id: Number = 0;
  public pageHtml: any;
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pageService: PageService,
    private sanitizer:DomSanitizer) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
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
      this.pageHtml = this.sanitizer.bypassSecurityTrustHtml(this.page.content);
    });
  }

}
