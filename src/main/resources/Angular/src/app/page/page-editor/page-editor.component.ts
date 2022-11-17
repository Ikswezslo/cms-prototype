import { Component, OnInit } from '@angular/core';
import {PageService} from "../../../assets/service/page.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Page} from "../../../assets/models/page";
import {TranslateService} from "@ngx-translate/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogTemplateLoadComponent} from "../../templates/dialog-template-load/dialog-template-load.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements OnInit {

  page?: Page;
  content?: string;

  constructor(private pageService: PageService,
              private router: Router,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    let id = Number(routeParams.get('pageId'));
    if (id) {
      this.loadPage(id.valueOf());
    }
  }

  private loadPage(id: number) {
    this.pageService.getPage(id)
      .subscribe(res => {
        this.page = res;
        this.content = res.content;
      });
  }

  onSaved(content?: string) {
    if (content && this.page) {
      this.pageService.modifyPageContentField(this.page.id, content).subscribe(
        () => {
          this.snackBar.open(this.translate.instant("PAGE_SAVED"), this.translate.instant("CLOSE"), {
            duration: 2000
          });
        }
      );
    }
  }

  onLoadTemplate() {
    let dialogData = {
      data: {
        page: this.page
      }
    }
    const dialogRef = this.dialog.open(DialogTemplateLoadComponent, dialogData);
    dialogRef.afterClosed().subscribe(res => {
      if (res !== undefined && this.page) {
        this.content = res;
      }
    });
  }
}
