import {Component, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from 'src/assets/models/page';
import {PageService} from '../../../assets/service/page.service';
import {MatDialog} from "@angular/material/dialog";
import {DialogPageCreateComponent} from "../dialog-page-create/dialog-page-create.component";
import {PageCardConfig} from "../page-card/page-card.component";
import {DialogPageCreatorComponent} from "../dialog-page-creator/dialog-page-creator.component";
import {DialogService} from 'src/assets/service/dialog.service';
import {SecurityService} from "../../../assets/service/security.service";
import {DialogPageEditBasicComponent} from "../dialog-page-edit-basic/dialog-page-edit-basic.component";
import {SpinnerService} from "../../../assets/service/spinner.service";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.scss']
})
export class PageDetailsComponent implements OnInit {
  public page!: Page;
  public universityHierarchy: Page[] = [];
  public id: Number = 0;
  public pageHtml: any;
  public showParentPage: boolean = false;
  public showChildPage: boolean = false;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  treeControl = new NestedTreeControl<Page>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Page>();
  hasChild = (_: number, node: Page) => !!node.children && node.children.length > 0;

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
    public securityService: SecurityService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private spinnerService: SpinnerService,
    private observer: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      this.id = Number(value.get('pageId'));
      this.loadPage();
    })

  }

  loadPage() {
    this.pageService.getPage(this.id)
      .subscribe({
        next: res => {
          this.page = res;
          this.loadHierarchy();
          this.pageHtml = this.sanitizer.bypassSecurityTrustHtml(this.page.content);
        },
        error: err => {
          this.dialogService.openDataErrorDialog(err.message);
        }
      });
  }

  hiddenPage() {
    this.pageService.modifyPageHiddenField(this.id, !this.page.hidden).subscribe(() => {
      this.page.hidden = !this.page.hidden;
    });
  }

  deletePage() {
    this.pageService.deletePage(this.id).subscribe(() => {
      this.router.navigateByUrl('');
    })
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

  loadHierarchy(){
    this.spinnerService.show();
    let uniId = this.page.university.id;
    this.pageService.getUniversityHierarchy(uniId)
      .subscribe({
        next: res => {
          this.universityHierarchy.pop();
          this.universityHierarchy.push(res);
          this.dataSource.data = this.universityHierarchy;
          this.spinnerService.hide();
        },
        error: err => {
          this.spinnerService.hide();
          this.dialogService.openDataErrorDialog();
        }
      });
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 1600px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'side';
      } else {
        this.sidenav.mode = 'over';
        this.sidenav.open();
      }
    });
    this.observer.observe(['(max-width: 700px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.close();
      } else {
        this.sidenav.open();
      }
    });
  }
}
