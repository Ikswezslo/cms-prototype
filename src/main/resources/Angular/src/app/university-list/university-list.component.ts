import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ColDef, ColumnApi, GridApi, RowSelectedEvent } from 'ag-grid-community';

import { university } from 'src/assets/models/university';
import { UniversityService } from 'src/assets/service/university.service';
import {DialogUniversityCreateComponent} from "../dialog-university-create/dialog-university-create.component";
import {MatDialog} from "@angular/material/dialog";

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
    private universityService: UniversityService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUniversities();
  }

  loadUniversities(showHidden: Boolean = false) {
    this.universityService.getUniversities()
      .subscribe(res => {
        this.universities = showHidden ? res : res.filter(element => !element.hidden);
      });
    this.columnApi.autoSizeAllColumns();
  }
  addUniversity(){
    const dialogRef = this.dialog.open(DialogUniversityCreateComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      this.loadUniversities();
    });
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
