import {Component, Input, OnInit} from '@angular/core';
import {FileService} from "../../assets/service/file.service";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {saveAs} from 'file-saver';
import {Page} from "../../assets/models/page";
import {UserService} from "../../assets/service/user.service";
import {ColDef, ColumnApi, GridApi} from "ag-grid-community";
import {SpinnerService} from "../../assets/service/spinner.service";
import {DialogService} from "../../assets/service/dialog.service";
import {FileResource} from "../../assets/models/file";

@Component({
  selector: 'app-file-card',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  @Input() page?: Page;

  public columnDefs = [{field: "filename"}, {field: "fileType"}, {field: "uploadDate"}, {field: "uploadedBy"}];
  public gridApi!: GridApi;
  public columnApi!: ColumnApi;
  public defaultColDef: ColDef = {};

  public filesData: FileResource[] = [];

  private filename: string[] = [];
  private fileStatus = {status: '', requestType: '', percent: 0};

  constructor(
    private fileService: FileService,
    private userService: UserService,
    private dialogService: DialogService,
    private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this.loadColumn();
    this.loadFiles();
    console.log(this.filesData[0]);
  }

  onResize() {
    this.gridApi.sizeColumnsToFit();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  loadColumn() {
    this.defaultColDef = {
      minWidth: 100,
      editable: false,
      filter: 'agTextColumnFilter',
      suppressMovable: true
    };
    //this.translateColumnDefs();
  }

  loadFiles() {
    const pageId = this.page?.id;
    this.spinnerService.show();
    this.fileService.getAll(pageId!).subscribe({
      next: res => {
        this.spinnerService.hide();
        console.log(res);
        this.filesData = res;
      },
      error: err => {
        this.spinnerService.hide();
        this.dialogService.openDataErrorDialog();
      }
    });
    if (this.gridApi)
      this.gridApi.sizeColumnsToFit();
  }

  onUploadFiles(files: File[]): void {
    const formData = new FormData();
    const userId = this.userService.loggedUser?.id;
    const pageId = this.page?.id;
    for (const file of files) {
      formData.append('files', file, file.name);
    }
    this.fileService.upload(formData, pageId!, userId!).subscribe({
      next: res => {
        console.log(res);
        this.reportProgress(res);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onDownloadFiles(filename: string): void {
    const pageId = this.page?.id;
    this.fileService.download(filename, pageId!).subscribe({
      next: res => {
        console.log(res);
        this.reportProgress(res);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  private reportProgress(event: HttpEvent<string[] | Blob>): void {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(event.loaded, event.total!, 'Uploading');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(event.loaded, event.total!, 'Downloading');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', event);
        break;
      case HttpEventType.Response:
        if (event.body instanceof Array) {
          for (const filename of event.body) {
            this.filename.unshift(filename);
          }
        } else {
          saveAs(new File([event.body!], event.headers.get('File-Name')!, {type: `${event.headers.get('Content-Type')};charset=utf-8`}));
        }
        break;
      default:
        console.log(event);
        break;
    }
  }

  private updateStatus(loaded: number, total: number, requestType: string) {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * (loaded / total));
  }
}
