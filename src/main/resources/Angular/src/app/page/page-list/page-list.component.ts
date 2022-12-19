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
  public columnDefs: ColDef[] = [];
  public defaultColDef: ColDef = {};
  public noRowsTemplate: string = "";

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

  loadPages() {
    this.spinnerService.show();
    this.pageService.getPages()
      .subscribe({
        next: res => {
          this.spinnerService.hide();
          this.pages = res.map(page => {
            const [dateComponents, timeComponents] = page.createdOn.split(' ');
            const [day, month, year] = dateComponents.split('-');
            page.createdOn = `${year}-${month}-${day} ${timeComponents}`
            return page
          });
        },
        error: err => {
          this.spinnerService.hide();
          this.dialogService.openDataErrorDialog();
        }
      });
  }

  translateColumnDefs(){
    this.columnDefs = [
      {
        headerName: this.translate.instant("ID"),
        field: 'id',
        filter: 'agNumberColumnFilter',
        flex: 0.5
      },
      {
        headerName: this.translate.instant("TITLE"),
        field: 'title',
        flex: 2
      },
      {
        headerName: this.translate.instant("DATE"),
        field: 'createdOn', filter: 'agDateColumnFilter',
      },
      {
        headerName: this.translate.instant("UNIVERSITY"),
        field: 'university.shortName',
        },
      {
        headerName: this.translate.instant("AUTHOR"),
        field: 'creator.username',
      },
      {
        headerName: 'Ukryta',
        field: 'hidden',
      },
    ];

    this.noRowsTemplate = this.translate.instant("NO_ROWS_TO_SHOW");
  }

  loadColumn() {
    this.translateColumnDefs();
    this.defaultColDef = {
      editable: false,
      filter: 'agTextColumnFilter',
      sortable: true,
      flex: 1,
      filterParams: {
        buttons: ['reset', 'apply'],
      }
    };
  }

  onResize() {

  }

  onRowSelected(event: RowSelectedEvent) {
    this.router.navigateByUrl('/page/' + event.data.id);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    window.addEventListener('resize', function () {
      setTimeout(function () {
      });
    });
  }
}

