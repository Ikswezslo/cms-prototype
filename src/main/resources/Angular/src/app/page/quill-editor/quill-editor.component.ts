import {Component, OnInit} from '@angular/core';
import Quill from "quill";
import {Page} from "../../../assets/models/page";
import {PageService} from "../../../assets/service/page.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss']
})
export class QuillEditorComponent implements OnInit {

  content?: String;

  public page?: Page;
  public id?: Number;

  constructor(
    private pageService: PageService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('pageId'));

    this.page = this.pageService.tempPage;
    this.pageService.tempPage = undefined;

    if (this.id && !this.page) {
      this.loadPage(this.id.valueOf());
    }
  }

  loadPage(id: number) {
    this.pageService.getPage(id)
      .subscribe(res => {
        this.page = res;
      });
  }

  created(quill: Quill) {
    if (this.page?.content) {
      quill.clipboard.dangerouslyPasteHTML(this.page.content);
    }
  }


  save() {
    console.log(this.content)
    if (this.content != undefined && this.page) {
      this.pageService.modifyPageContentField(this.page.id, this.content as string).subscribe(
          () => {
            this.snackBar.open("Zapisano stronę", "Zamknij", {
              duration: 2000
            });
          }
      );
    }
  }
}
