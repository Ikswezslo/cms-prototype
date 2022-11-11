import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Quill from "quill";
import {Page} from "../../../assets/models/page";
import {PageService} from "../../../assets/service/page.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import ImageResize from 'quill-image-resize-module'
import {TranslateService} from "@ngx-translate/core";

Quill.register('modules/imageResize', ImageResize)

@Component({
  selector: 'app-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss']
})
export class QuillEditorComponent implements OnInit {

  @Input() title: string = "Editing";
  @Input() subtitle?: string = "Title"
  @Input() content?: string;
  @Input() onCloseLink?: any[] = ['/'];
  @Output() saved = new EventEmitter<any>;

  modules = {}

  constructor() {
    this.modules = {
      imageResize: {},
    }
  }

  ngOnInit(): void {
  }

  created(quill: Quill) {
    if (this.content) {
      quill.clipboard.dangerouslyPasteHTML(this.content);
    }
  }

  save() {
    if (this.content) {
      this.saved.emit(this.content);
    }
  }
}
