import {Component, OnInit} from '@angular/core';
import Quill from "quill";
import {EditorChangeContent, EditorChangeSelection} from "ngx-quill";
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

  content?: String = undefined;

  blurred = false
  focused = false

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

    console.log(this.pageService.tempPage)
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
        console.log(res)
      });
  }

  created(quill: Quill) {
    console.log('editor-created', quill, this.page)

    quill.clipboard.dangerouslyPasteHTML(this.page?.content as string);
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    console.log('editor-change', event)
  }

  focus($event: any) {
    console.log('focus', $event)
    this.focused = true
    this.blurred = false
  }

  blur($event: any) {
    console.log('blur', $event)
    this.focused = false
    this.blurred = true
  }

  save() {
    console.log(this.content)
    if (this.content != undefined && this.page) {
      this.pageService.updatePageContent(this.page.id, this.content as string).subscribe(
        res => {
          this.snackBar.open("Zapisano stronę", "Zamknij", {
            duration: 2000
          });
        }
      );
    }
  }
}
