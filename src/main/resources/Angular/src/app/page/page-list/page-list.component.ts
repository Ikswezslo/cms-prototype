import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ColDef, ColumnApi, GridApi, RowSelectedEvent} from 'ag-grid-community';
import {Page} from 'src/assets/models/page';
import {DialogService} from 'src/assets/service/dialog.service';
import {SpinnerService} from 'src/assets/service/spinner.service';
import {PageService} from '../../../assets/service/page.service';
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {

  pages: Page[] = [];
  public selected = false;
  gridApi!: GridApi;
  columnApi!: ColumnApi;
  public dataTable!: [{ id?: Number, title?: String, date?: String, university?: String, creator?: String }];
  public columnDefs: ColDef[] = [];
  public defaultColDef: ColDef = {};
  public noRowsTemplate;

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private spinnerService: SpinnerService,
    private pageService: PageService,
    private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(() => {
      this.translateColumnDefs();
    })
    this.loadColumn()
    this.loadPages();
  }

  loadPages(showHidden: Boolean = false) {
    this.spinnerService.show();
    this.pageService.getPages()
      .subscribe({
        next: res => {
          this.spinnerService.hide();
          this.pages = showHidden ? res : res.filter(element => !element.hidden);
          res.forEach(el => {
            if (!this.dataTable)
              this.dataTable = [{
                id: el.id,
                title: el.title,
                date: el.createdOn,
                university: el.university.name,
                creator: el.creator.firstName + " " + el.creator.lastName
              }];
            else
              this.dataTable.push({
                id: el.id,
                title: el.title,
                date: el.createdOn,
                university: el.university.name,
                creator: el.creator.firstName + " " + el.creator.lastName
              })
          });
        },
        error: () => {
          this.spinnerService.hide();
        }
      });
    this.gridApi.sizeColumnsToFit();
  }

  translateColumnDefs(){
    this.columnDefs = [
      {headerName: this.translate.instant("ID"), field: 'id', maxWidth: 100, filter: 'agNumberColumnFilter'},
      {headerName: this.translate.instant("TITLE"), field: 'title', minWidth: 300},
      {headerName: this.translate.instant("DATE"), field: 'date'},
      {headerName: this.translate.instant("UNIVERSITY"), field: 'university', minWidth: 300},
      {headerName: this.translate.instant("AUTHOR"), field: 'creator'},
    ];
    this.noRowsTemplate = this.translate.instant("NO_ROWS_TO_SHOW");
  }

  loadColumn() {
    this.translateColumnDefs();
    this.defaultColDef = {
      minWidth: 200,
      editable: false,
      filter: 'agTextColumnFilter',
      suppressMovable: true,
    };
  }

  onResize() {
    this.gridApi.sizeColumnsToFit();
    // this.columnApi.autoSizeAllColumns(false);

  }

  onRowSelected(event: RowSelectedEvent) {
    this.router.navigateByUrl('/page/' + event.data.id);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    // this.columnApi.autoSizeAllColumns(false);
    this.gridApi.sizeColumnsToFit();
  }
}

