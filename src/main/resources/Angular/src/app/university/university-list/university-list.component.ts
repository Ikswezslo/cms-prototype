import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {ColDef, ColumnApi, GridApi, RowSelectedEvent} from 'ag-grid-community';

import {University} from 'src/assets/models/university';
import {UniversityService} from 'src/assets/service/university.service';
import {DialogUniversityCreateComponent} from "../dialog-university-create/dialog-university-create.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from 'src/assets/service/dialog.service';
import {SpinnerService} from 'src/assets/service/spinner.service';

@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.component.html',
  styleUrls: ['./university-list.component.scss']
})
export class UniversityListComponent implements OnInit {

  universities: University[] = [];
  public selected = false;
  gridApi!: GridApi;
  columnApi!: ColumnApi;

  public columnDefs: ColDef[] = [];
  public defaultColDef: ColDef = {
    width: 300,
    editable: false,
    filter: 'agTextColumnFilter',
    suppressMovable: true
};
  constructor(
    private router: Router,
    private errorHandleService: DialogService,
    private spinnerService: SpinnerService,
    private universityService: UniversityService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadColumn();
    this.loadUniversities();
  }

  loadUniversities(showHidden: Boolean = false) {
    this.spinnerService.show();
    this.universityService.getUniversities()
      .subscribe({
        next: res => {
          this.spinnerService.hide();
        this.universities = showHidden ? res : res.filter(element => !element.hidden);
        },
        error: err => {
          this.spinnerService.hide();
          this.errorHandleService.openDataErrorDialog();
      }});
    this.gridApi.sizeColumnsToFit();
  }

  loadColumn() {
    this.columnDefs=[
      { field: 'id', width: 100, minWidth: 100,filter: 'agNumberColumnFilter' },
      { field: 'name', minWidth: 300},
      { field: 'shortName', minWidth:150 },
    ];
  }

  addUniversity(){
    const dialogRef = this.dialog.open(DialogUniversityCreateComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (!result)
        return;
      this.loadUniversities();
      this.gridApi.sizeColumnsToFit();
    });
  }

  onResize() {
    this.gridApi.sizeColumnsToFit();
    //this.columnApi.autoSizeAllColumns(false);

  }

  onRowSelected(event: RowSelectedEvent) {
    this.router.navigateByUrl('/university/' + event.data.id);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }
}
