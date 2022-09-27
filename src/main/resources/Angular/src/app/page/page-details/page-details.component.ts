import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from 'src/assets/models/page';
import {PageService} from '../../../assets/service/page.service';
import {UserService} from "../../../assets/service/user.service";
import {User} from "../../../assets/models/user";
import {PageCardConfig} from "../page-card/page-card.component";

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.scss']
})
export class PageDetailsComponent implements OnInit {

  public page!: Page;
  public id: Number = 0;
  public pageHtml: any;
  public loggedUser!: User;

  primaryCardConfig: PageCardConfig = {
    useSecondaryColor: false,
    showGoToButton: false,
    showDescription: true,
    showUniversity: true,
    showCreatedOn: true,
    showAuthor: true
  };

  secondaryCardConfig: PageCardConfig = {
    useSecondaryColor: true,
    showGoToButton: true,
    showDescription: true,
    showUniversity: false,
    showCreatedOn: true,
    showAuthor: true
  };


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pageService: PageService,
    private userService: UserService,
    private sanitizer: DomSanitizer) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('pageId'));
    this.getLoggedUser();
    this.loadPage();
  }

  ngOnDestroy(): void {
    this.pageService.tempPage = this.page;
  }

  loadPage() {
    this.pageService.getPage(this.id)
      .subscribe(res => {
        this.page = res;
        this.pageHtml = this.sanitizer.bypassSecurityTrustHtml(this.page.content);
      });
  }

  getLoggedUser() {
    this.userService.getLoggedUser()
      .subscribe(res => {
        this.loggedUser = res;
      })
  }

  hiddenPage() {
    this.pageService.pageSetHidden(this.id, !this.page.hidden).subscribe(() => {
      this.loadPage();
    });
  }
}
