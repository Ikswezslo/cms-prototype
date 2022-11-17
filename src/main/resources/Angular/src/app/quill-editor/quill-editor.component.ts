import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Quill from "quill";
import ImageResize from 'quill-image-resize-module'

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
  @Input() onCloseLinkParams?: any;
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
