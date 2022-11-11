import { Component, OnInit } from '@angular/core';
import {PageService} from "../../../assets/service/page.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Page} from "../../../assets/models/page";
import {TranslateService} from "@ngx-translate/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements OnInit {

  public page?: Page;

  constructor(private pageService: PageService,
              private router: Router,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private snackBar: MatSnackBar) { }

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
}
