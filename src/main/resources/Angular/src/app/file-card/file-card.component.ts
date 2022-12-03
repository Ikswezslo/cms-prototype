import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FileService} from "../../assets/service/file.service";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {saveAs} from 'file-saver';
import {Page} from "../../assets/models/page";
import {UserService} from "../../assets/service/user.service";
import {ColDef, ColumnApi, GridApi} from "ag-grid-community";
import {DialogService} from "../../assets/service/dialog.service";
import {FileResource} from "../../assets/models/file";
import {PageService} from "../../assets/service/page.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-file-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent implements OnChanges {
  @Input() page!: Page;
  public columnDefs: ColDef[] = [];
  public gridApi!: GridApi;
  public columnApi!: ColumnApi;
  public defaultColDef: ColDef = {};
  public filesData: FileResource[] = [];
  public noRowsTemplate;
  public fileStatus = '';


  constructor(
    private pageService: PageService,
    private fileService: FileService,
    private userService: UserService,
    private translate: TranslateService,
    private dialogService: DialogService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.translate.onLangChange.subscribe(() => {
      this.translateColumnDefs();
    })
    this.loadColumn();
    this.loadFiles(this.page.id);
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe(() => {
      this.translateColumnDefs();
    })
    this.loadColumn();
    this.loadFiles(this.page.id);
  }

  onResize() {
    this.gridApi.sizeColumnsToFit();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.ensureIndexVisible(0);
  }

  loadColumn() {
    this.defaultColDef = {
      minWidth: 200,
      maxWidth: 500,
      editable: false,
      filter: 'agTextColumnFilter',
      resizable: false,
      suppressMovable: true
    };
    this.translateColumnDefs();
  }

  translateColumnDefs() {
    this.columnDefs = [{headerName: this.translate.instant("FILENAME"), field: "filename", resizable: true},
      {headerName: this.translate.instant("TYPE"), field: "fileType", resizable: true},
      {headerName: this.translate.instant("SIZE"), field: "fileSize"},
      {headerName: this.translate.instant("UPLOAD_DATE"), field: "uploadDate", resizable: true},
      {headerName: this.translate.instant("UPLOADED_BY"), field: "uploadedBy"}];
    this.noRowsTemplate = this.translate.instant("NO_ROWS_TO_SHOW");
  }

  loadFiles(pageId: Number) {
    this.fileService.getAll(pageId!).subscribe({
      next: res => {
        this.filesData = res;
        if (this.gridApi) {
          this.gridApi.setRowData(this.filesData);
          this.fileStatus = "";
          console.log(this.fileStatus);
        }
      },
      error: () => {
        this.dialogService.openDataErrorDialog();
      }
    });
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();

    }
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
        this.reportProgress(res);
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
        this.reportProgress(res);
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
