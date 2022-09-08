import {Component, Input, OnInit} from '@angular/core';
import Quill from "quill";
import {EditorChangeContent, EditorChangeSelection} from "ngx-quill";
import {Page} from "../../assets/models/page";
import {PageService} from "../../assets/service/page.service";

@Component({
  selector: 'app-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss']
})
export class QuillEditorComponent implements OnInit {
  @Input() page: Page = {} as Page;
  content?: String = undefined;

  blurred = false
  focused = false
  private quill!: Quill;

  constructor(private pageService: PageService) {
  }

  ngOnInit(): void {
  }

  created(quill: Quill) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', quill, this.page)

    quill.clipboard.dangerouslyPasteHTML(this.page.content);
    this.quill = quill;
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    console.log('editor-change', event)
  }

  focus($event: any) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event)
    this.focused = true
    this.blurred = false
  }

  blur($event: any) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event)
    this.focused = false
    this.blurred = true
  }

  save() {
    console.log(this.content)
    if (this.content != undefined) {
      this.pageService.updatePageContent(this.page.id, this.content as string).subscribe();
    }
  }
}
