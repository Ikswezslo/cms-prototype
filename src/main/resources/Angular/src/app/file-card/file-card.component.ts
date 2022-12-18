import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FileService} from "../../assets/service/file.service";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {saveAs} from 'file-saver';
import {Page} from "../../assets/models/page";
import {UserService} from "../../assets/service/user.service";
import {DialogService} from "../../assets/service/dialog.service";
import {FileResource} from "../../assets/models/file";
import {PageService} from "../../assets/service/page.service";
import {TranslateService} from "@ngx-translate/core";
import {ConfirmationDialogComponent} from "../dialog/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../dialog/error-dialog/error-dialog.component";
import {SecurityService} from "../../assets/service/security.service";

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent implements OnChanges {
  @Input() page!: Page;
  public columns: string[] = ['filename', 'fileType', 'fileSize', 'uploadDate', "uploadedBy", 'action'];
  public filesData: FileResource[] = [];
  public hideBar: boolean = true;

  constructor(
    private pageService: PageService,
    private fileService: FileService,
    private userService: UserService,
    public securityService: SecurityService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private dialogService: DialogService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadFiles(this.page.id);
  }

  loadFiles(pageId: Number) {
    this.fileService.getAll(pageId!).subscribe({
      next: res => {
        this.filesData = res;
        this.hideBar = true;
      },
      error: () => {
        this.dialogService.openDataErrorDialog();
        this.hideBar = true;
      }
    });
  }

  onDeleteFile(filename: string): void {
    const deletingDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: this.translate.instant("DELETING") + ' ' + filename,
        description: this.translate.instant("DELETE_FILE_DESCRIPTION")
      }
    });
    deletingDialog.afterClosed().subscribe(res => {
      if (res) {
        this.fileService.deleteFile(filename, this.page.id).subscribe({
          next: () => {
            this.dialogService.openSuccessDialog(this.translate.instant("DELETE_FILE_CONFIRMATION"));
            this.loadFiles(this.page.id)
          },
          error: err => {
            this.dialog.open(ErrorDialogComponent, {
              data: {
                description: err.message || this.translate.instant("DELETE_FILE_ERROR")
              }
            })
          }
        });
      }
    });
  }

  onUploadFiles(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    const formData = new FormData();
    const userId = this.userService.loggedUser?.id;
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }
    this.fileService.upload(formData, this.page.id, userId!).subscribe({
      next: res => {
        this.reportProgress(res);
        this.hideBar = false;
      },
      error: () => {
        this.dialogService.openDataErrorDialog();
      }
    });

  }

  onDownloadFiles(filename: string): void {

    this.fileService.download(filename, this.page.id).subscribe({
      next: res => {
        this.reportProgress(res);
        this.hideBar = false;
      },
      error: () => {
        this.dialogService.openDataErrorDialog();
      }
    });
  }

  private reportProgress(event: HttpEvent<string[] | Blob>): void {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        break;
      case HttpEventType.DownloadProgress:
        break;
      case HttpEventType.ResponseHeader:
        break;
      case HttpEventType.Response:
        if (!(event.body instanceof Array)) {
          saveAs(new File([event.body!], event.headers.get('File-Name')!, {type: `${event.headers.get('Content-Type')};charset=utf-8`}));
        }
        this.loadFiles(this.page.id)
        break;
      default:
        break;
    }
  }

}

