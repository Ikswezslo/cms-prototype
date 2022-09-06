import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ColDef, GridApi, RowSelectedEvent} from 'ag-grid-community';
import {Page} from 'src/assets/models/page';
import {PageService} from '../../../assets/service/page.service';


@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {

  pages: Page[] = [];
  public selected = false;
  gridApi = GridApi;

  public columnDefs: ColDef[] = [
    { field: 'id', type: 'numericColumn', filter: 'agNumberColumnFilter' },
    { field: 'title'},
    { field: 'creatorID', type: 'numericColumn', filter: 'agNumberColumnFilter' },
  ];

  public defaultColDef: ColDef = {
    width: 300,
    editable: false,
    filter: 'agTextColumnFilter',
    suppressMovable: true,
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private pageService: PageService) {}

  ngOnInit(): void {
    this.loadPages();
  }

  loadPages(showHidden: Boolean = false) {
    this.pageService.getPages()
      .subscribe(res => {
        this.pages = showHidden ? res : res.filter(element => !element.hidden);
    });
  }

  onRowSelected(event: RowSelectedEvent) {
    this.router.navigateByUrl('/page/' + event.data.id);
  }
  onGridReady(params: any) {
    params.columnApi.autoSizeAllColumns(false);
  }
}
