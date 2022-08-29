import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ColDef, ColumnApi, GridApi, RowSelectedEvent } from 'ag-grid-community';
import { university } from 'src/assets/models/university';
import { UniversityService } from 'src/assets/service/university.service';

@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.component.html',
  styleUrls: ['./university-list.component.scss']
})
export class UniversityListComponent implements OnInit {

  universities: university[] = [];
  public selected = false;
  gridApi!: GridApi;
  columnApi!: ColumnApi;

  public columnDefs: ColDef[] = [
    { field: 'id', type: 'numericColumn', width: 100, filter: 'agNumberColumnFilter' },
    { field: 'name', width: 500},
    { field: 'shortName' },
  
  ];
  public defaultColDef: ColDef = {
    width: 300,
    editable: false,
    filter: 'agTextColumnFilter',
    suppressMovable: true
};
  constructor(
    private router: Router,
    private universitieService: UniversityService) {}

  ngOnInit(): void {
    this.loadUniversities();
  }

  loadUniversities(showHidden: Boolean = false) {
    this.universitieService.getUniversities()
      .subscribe(res => {
        this.universities = showHidden ? res : res.filter(element => !element.hidden);
      });
    this.columnApi.autoSizeAllColumns();
  }

  onRowSelected(event: RowSelectedEvent) {
    this.router.navigateByUrl('/university/' + event.data.id);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.columnApi.autoSizeAllColumns();
  }
}
