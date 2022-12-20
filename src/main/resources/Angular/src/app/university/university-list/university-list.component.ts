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

  public columnDefs: ColDef[] = [];
  public defaultColDef: ColDef = {};
  public noRowsTemplate;
  universities: University[] = [];
  data: UniversityGridItem[] = [];
  gridApi?: GridApi;
  columnApi?: ColumnApi;

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
      this.translateData();
    })
    this.loadColumn();
    this.loadUniversities();
  }

  loadUniversities() {
    this.spinnerService.show();
    this.universityService.getUniversities()
      .subscribe({
        next: res => {
          this.spinnerService.hide();
          this.universities = res;
          this.translateData();
        },
        error: err => {
          this.spinnerService.hide();
          this.dialogService.openDataErrorDialog();
        }
      });
  }

  translateData() {
    this.data = this.universities.map(university => {
      const universityItem = university as UniversityGridItem
      if (universityItem.hidden) {
        universityItem.hiddenTranslated = this.translate.instant("YES");
      } else {
        universityItem.hiddenTranslated = this.translate.instant("NO");
      }
      return universityItem
    });
  }

  translateColumnDefs(){
    this.columnDefs=[
      {
        headerName: this.translate.instant("ID"), field: 'id', flex: 0.5,
        minWidth: 80,
        filter: 'agNumberColumnFilter'
      },
      {
        headerName: this.translate.instant("NAME"), field: 'name', flex: 1.5,
        minWidth: 200,
      },
      {
        headerName: this.translate.instant("SHORT_NAME"),  field: 'shortName',
        minWidth: 200,
      },
      {
        headerName: this.translate.instant("IS_HIDDEN_UNIVERSITY"), field: 'hiddenTranslated',
        minWidth: 100,
      },
    ];
    this.noRowsTemplate = this.translate.instant("NO_ROWS_TO_SHOW");
  }

  loadColumn() {
    this.translateColumnDefs();
    this.defaultColDef = {
      flex: 1,
      filter: 'agTextColumnFilter',
      suppressMovable: true,
      sortable: true,
      editable: false,
      filterParams: {
        buttons: ['reset', 'apply'],
      }
    };
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
    });
  }

  onRowSelected(event: RowSelectedEvent) {
    this.router.navigateByUrl('/university/' + event.data.id);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }
}

interface UniversityGridItem extends University {
  hiddenTranslated: string;
}
