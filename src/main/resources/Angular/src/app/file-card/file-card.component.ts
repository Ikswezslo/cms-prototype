import {Component, Input, OnInit} from '@angular/core';
import {FileService} from "../../assets/service/file.service";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {saveAs} from 'file-saver';
import {Page} from "../../assets/models/page";
import {UserService} from "../../assets/service/user.service";
import {DialogService} from "../../assets/service/dialog.service";
import {FileResource} from "../../assets/models/file";
import {PageService} from "../../assets/service/page.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent implements OnInit {
  @Input() page!: Page;
  public columns: string[] = ['filename', 'fileType', 'fileSize', 'uploadDate', "uploadedBy", 'action'];
  public filesData: FileResource[] = [];
  public fileStatus = '';

  constructor(
    private pageService: PageService,
    private fileService: FileService,
    private userService: UserService,
    private translate: TranslateService,
    private dialogService: DialogService) {
  }

  ngOnInit() {
    this.loadFiles(this.page.id);
  }

  loadFiles(pageId: Number) {
    this.fileService.getAll(pageId!).subscribe({
      next: res => {
        this.filesData = res;
      },
      error: () => {
        this.dialogService.openDataErrorDialog();
      }
    });
  }

  onDeleteFile(filename: string): void {
    const pageId = this.page?.id;
    this.fileService.deleteFile(filename, pageId!).subscribe({
      next: () => {
        window.location.reload();
      }
    })
  }

  onUploadFiles(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    const formData = new FormData();
    const userId = this.userService.loggedUser?.id;
    const pageId = this.page?.id;
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }
    this.fileService.upload(formData, pageId!, userId!).subscribe({
      next: res => {
        FileCardComponent.reportProgress(res);
        this.fileStatus = 'progress';
      },
      error: () => {
        this.dialogService.openDataErrorDialog();
      }
    });

  }

  onDownloadFiles(filename: string): void {
    const pageId = this.page?.id;

    this.fileService.download(filename, pageId!).subscribe({
      next: res => {
        FileCardComponent.reportProgress(res);
      },
      error: () => {
        this.dialogService.openDataErrorDialog();
      }
    });
  }

  private static reportProgress(event: HttpEvent<string[] | Blob>): void {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        break;
      case HttpEventType.DownloadProgress:
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', event);
        break;
      case HttpEventType.Response:
        if (event.body instanceof Array) {
          window.location.reload();
        } else {
          saveAs(new File([event.body!], event.headers.get('File-Name')!, {type: `${event.headers.get('Content-Type')};charset=utf-8`}));
        }
        break;
      default:
        console.log(event);
        break;
    }
  }

}

