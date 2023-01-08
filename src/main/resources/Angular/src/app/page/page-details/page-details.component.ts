import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from 'src/assets/models/page';
import {PageService} from '../../../assets/service/page.service';
import {MatDialog} from "@angular/material/dialog";
import {DialogPageCreateComponent} from "../dialog-page-create/dialog-page-create.component";
import {PageCardConfig} from "../page-card/page-card.component";
import {DialogPageCreatorComponent} from "../dialog-page-creator/dialog-page-creator.component";
import {SecurityService} from "../../../assets/service/security.service";
import {EditPageKeyWordsComponent} from 'src/app/keywords/edit-page-key-words/edit-page-key-words.component';
import {DialogPageEditBasicComponent} from "../dialog-page-edit-basic/dialog-page-edit-basic.component";
import {ConfirmationDialogComponent} from "../../dialog/confirmation-dialog/confirmation-dialog.component";
import {DialogService} from "../../../assets/service/dialog.service";
import {TranslateService} from "@ngx-translate/core";
import {SpinnerService} from "../../../assets/service/spinner.service";
import {MatDrawerMode, MatSidenav} from "@angular/material/sidenav";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.scss']
})
export class PageDetailsComponent implements OnInit, OnDestroy {
  public page!: Page;
  public universityHierarchy: Page[] = [];
  public id: Number = 0;
  public pageHtml: any;
  public showParentPage: boolean = true;
  public showChildPages: boolean = true;
  public xs: number = 600;
  public sidenavWidth: string = this.toPixels(innerWidth >= this.xs ? 350 : 50);
  public sidenavExtended: boolean = innerWidth >= this.xs;
  public modeOnInit: MatDrawerMode = innerWidth >= 1740 ? 'over' : 'side';
  public innerWidth: number = innerWidth;
  public mainPageAddress: string = "";

  private sidenavToggledSubscription?: Subscription;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  treeControl = new NestedTreeControl<Page>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Page>();
  hasChild = (_: number, node: Page) => !!node.children && node.children.length > 0;

  primaryCardConfig: PageCardConfig = {
    useSecondaryColor: false,
    showLink: false,
    showDescription: true,
    showUniversity: true,
    showCreatedOn: true,
    showAuthor: true
  };

  secondaryCardConfig: PageCardConfig = {
    useSecondaryColor: true,
    showLink: true,
    showDescription: true,
    showUniversity: false,
    showCreatedOn: true,
    showAuthor: true
  };

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private pageService: PageService,
    private dialogService: DialogService,
    private translate: TranslateService,
    public securityService: SecurityService,
    private sanitizer: DomSanitizer,
    private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this.innerWidth = innerWidth;
    this.route.paramMap.subscribe(value => {
      this.id = Number(value.get('pageId'));
      this.loadPage();
      if(innerWidth < this.xs && this.sidenavExtended)
        this.toggleSidenav();
    })
    this.sidenavToggledSubscription = this.pageService.sidenavToggled
      .subscribe(
        () => {
          this.toggleSidenav();
        }
      );
  }

  ngOnDestroy(): void {
    this.sidenavToggledSubscription?.unsubscribe()
  }

  loadPage() {
    this.pageService.getPage(this.id)
      .subscribe(res => {
          this.page = res;
          this.loadHierarchy();
          this.pageHtml = this.sanitizer.bypassSecurityTrustHtml(this.page.content);
        }
      );
  }

  hiddenPage() {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: this.translate.instant("HIDING") + ": " + this.page.title,
        description: this.translate.instant("HIDE_DESCRIPTION")
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.pageService.modifyPageHiddenField(this.id, !this.page.hidden).subscribe(() => {
          this.page.hidden = !this.page.hidden;
          this.dialogService.openSuccessDialog(this.translate.instant("HIDING_CONFIRMATION"));
        });
      }
    })
  }

  deletePage() {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: this.translate.instant("DELETING") + " " + this.page.title,
        description: this.translate.instant("PAGE_DELETE_DESCRIPTION")
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.pageService.deletePage(this.id).subscribe(
          {
            next: () => {
              this.dialogService.openSuccessDialog(this.translate.instant("DELETE_PAGE_CONFIRMATION"));
              this.router.navigateByUrl('/pages');
            }
          }
        );
      }
    });
  }

  addPage() {
    let dialogData = {
      data: {
        edit: false,
        page: this.page
      }
    }
    const dialogRef = this.dialog.open(DialogPageCreateComponent, dialogData);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.router.navigateByUrl(`page/${res}`);
      }
    });
  }

  editPage() {
    let dialogData = {
      data: {
        id: this.page.id,
        title: this.page.title,
        description: this.page.description
      }
    }
    const dialogRef = this.dialog.open(DialogPageEditBasicComponent, dialogData);
    dialogRef.afterClosed().subscribe(() => {
      this.loadPage();
    });
  }

  changePageCreator() {
    let dialogData = {
      data: {
        id: this.page.id,
        username: this.page.creator.username
      }
    }
    const dialogRef = this.dialog.open(DialogPageCreatorComponent, dialogData);
    dialogRef.afterClosed().subscribe(() => {
      this.loadPage();
    });
  }

  changeKeyWords() {
    let dialogData = {
      data: {
        id: this.page.id,
        keyWords: this.page.keyWords
      }
    }
    const dialogRef = this.dialog.open(EditPageKeyWordsComponent, dialogData);
    dialogRef.afterClosed().subscribe(() => {
      this.loadPage();
    });
  }

  loadHierarchy(){
    this.spinnerService.show();
    let uniId = this.page.university.id;
    this.pageService.getUniversityHierarchy(uniId)
      .subscribe({
        next: res => {
          this.universityHierarchy.pop();
          this.universityHierarchy.push(res);
          this.dataSource.data = this.universityHierarchy[0].children;
          this.mainPageAddress = this.universityHierarchy[0].id.toString();
          this.spinnerService.hide();
        }
      });
  }

  onResize(event) {
    this.innerWidth = event.target.innerWidth;

    if(event.target.innerWidth >= 1740)
      this.sidenav.mode = 'over';
    else
      this.sidenav.mode = 'side';

    if(event.target.innerWidth >= this.xs && !this.sidenav.opened)
      this.sidenav.open!();

    if(this.sidenavExtended){
      if(event.target.innerWidth >= this.xs)
        this.sidenavWidth = this.toPixels(350);
      else
        this.sidenavWidth = this.toPixels(event.target.innerWidth);
      if(event.target.innerWidth < this.xs)
        this.sidenav.open!();
    }
    else{
      this.sidenavWidth = this.toPixels(50);
      if(event.target.innerWidth < this.xs)
        this.sidenav.close!();
    }
  }

  toggleSidenav(){
    this.sidenavExtended = !this.sidenavExtended;
    window.dispatchEvent(new Event('resize'));
  }

  /**This function changes sidenavWidth to a string with a 'px' suffix, because without it, sidenav will not wrap correctly.*/
  toPixels(num: number):string{
    return num.toString()+"px";
  }
}
