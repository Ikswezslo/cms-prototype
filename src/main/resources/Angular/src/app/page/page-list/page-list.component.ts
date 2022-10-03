import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, ColumnApi, GridApi, RowSelectedEvent } from 'ag-grid-community';
import { Page } from 'src/assets/models/page';
import { ErrorHandleService } from 'src/assets/service/error-handle.service';
import { SpinnerService } from 'src/assets/service/spinner.service';
import { PageService } from '../../../assets/service/page.service';


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
  public defaultColDef: ColDef = {}

  constructor(
    private router: Router,
    private errorHandleService: ErrorHandleService,
    private spinnerService: SpinnerService,
    private pageService: PageService) { }

  ngOnInit(): void {
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
        error: err => {
          this.spinnerService.hide();
          this.errorHandleService.openDataErrorDialog();
        }
      });
    this.gridApi.sizeColumnsToFit();
  }

  loadColumn() {
    this.columnDefs=[
      { field: 'id', maxWidth:100, filter: 'agNumberColumnFilter' },
      { field: 'title', minWidth: 300},
      { field: 'date' },
      { field: 'university', minWidth: 300 },
      { field: 'creator' },
      
    ];

    this.defaultColDef = {
      minWidth:200,
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

