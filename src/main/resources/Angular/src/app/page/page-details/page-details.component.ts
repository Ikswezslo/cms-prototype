import {Component, OnInit} from '@angular/core';
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
import { EditPageKeyWordsComponent } from 'src/app/keywords/edit-page-key-words/edit-page-key-words.component';
import {DialogPageEditBasicComponent} from "../dialog-page-edit-basic/dialog-page-edit-basic.component";

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.scss']
})
export class PageDetailsComponent implements OnInit {
  public page!: Page;
  public id: Number = 0;
  public pageHtml: any;

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
    private router: Router,
    private route: ActivatedRoute,
    private pageService: PageService,
    public securityService: SecurityService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private dialogService: DialogService) {
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
}
