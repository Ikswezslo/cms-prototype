import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {ColDef, ColumnApi, GridApi, RowSelectedEvent} from 'ag-grid-community';

import {University} from 'src/assets/models/university';
import {UniversityService} from 'src/assets/service/university.service';
import {DialogUniversityCreateComponent} from "../dialog-university-create/dialog-university-create.component";
import {MatDialog} from "@angular/material/dialog";
import {SpinnerService} from 'src/assets/service/spinner.service';
import {take} from 'rxjs';
import {DialogService} from 'src/assets/service/dialog.service';
import {TranslateService} from "@ngx-translate/core";

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
  public noRowsTemplate;

  public columnDefs: ColDef[] = [];
  public defaultColDef: ColDef = {};
  constructor(
    private router: Router,
    private dialogService: DialogService,
    private spinnerService: SpinnerService,
    private universityService: UniversityService,
    public dialog: MatDialog,
    private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(() => {
      this.translateColumnDefs();
    })
    this.loadColumn();
    this.loadUniversities();
  }

  loadUniversities(showHidden: Boolean = false) {
    this.spinnerService.show();
    this.universityService.getUniversities().pipe(take(1))
      .subscribe({
        next: res => {
          this.spinnerService.hide();
          this.universities = showHidden ? res : res.filter(element => !element.hidden);
        },
        error: () => {
          this.spinnerService.hide();
        }
      });
    if(this.gridApi)
      this.gridApi.sizeColumnsToFit();
  }

  translateColumnDefs(){
    this.columnDefs=[
      {headerName: this.translate.instant("ID"), field: 'id', maxWidth: 100, filter: 'agNumberColumnFilter' },
      {headerName: this.translate.instant("NAME"), field: 'name', minWidth: 300},
      {headerName: this.translate.instant("SHORT_NAME"),  field: 'shortName', minWidth:150 },
    ];
    this.noRowsTemplate = this.translate.instant("NO_ROWS_TO_SHOW");
  }

  loadColumn() {
    this.defaultColDef = {
      minWidth: 100,
      editable: false,
      filter: 'agTextColumnFilter',
      suppressMovable: true
    };
    this.translateColumnDefs();
  }

  addUniversity(){
    let dialogData = {
      data: {
        edit: false
      }
    }
    const dialogRef = this.dialog.open(DialogUniversityCreateComponent, dialogData);

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
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
