import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ColDef, ColumnApi, GridApi, RowSelectedEvent} from 'ag-grid-community';
import {User} from 'src/assets/models/user';
import {DialogService} from 'src/assets/service/dialog.service';
import {SpinnerService} from 'src/assets/service/spinner.service';
import {UserService} from 'src/assets/service/user.service';
import {DialogUserCreateComponent} from '../dialogs/dialog-user-create/dialog-user-create.component';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  public columnDefs: ColDef[] = [];

  public defaultColDef: ColDef = {};

  gridApi!: GridApi;
  columnApi!: ColumnApi;

  public noRowsTemplate;


  constructor(
    private router: Router,
    private dialogService: DialogService,
    private userService: UserService,
    private spinnerService: SpinnerService,
    public dialog: MatDialog,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(() => {
      this.translateColumnDefs();
    })
    this.loadUsers();
    this.loadColumn();
  }


  loadUsers() {
    this.spinnerService.show();
    this.userService.getUsers()
      .subscribe({
        next: res => {
          this.spinnerService.hide();
        this.users = res;
        },
        error: () => {
          this.spinnerService.hide();
        }
      });
  }

  translateColumnDefs(){
    this.columnDefs = [
      {headerName: this.translate.instant("ID"), field: 'id', maxWidth: 100, filter: 'agNumberColumnFilter'},
      {headerName: this.translate.instant("USERNAME"), field: 'username', minWidth: 150},
      {headerName: this.translate.instant("FIRST_NAME"), field: 'firstName', minWidth: 150},
      {headerName: this.translate.instant("LAST_NAME"), field: 'lastName', minWidth: 150}
    ];
    this.noRowsTemplate = this.translate.instant("NO_ROWS_TO_SHOW");
  }

  loadColumn() {
    this.defaultColDef = {
      minWidth: 100,
      editable: false,
      filter: 'agTextColumnFilter',
      suppressMovable: true,
      type: 'textColumn'
    };
    this.translateColumnDefs();
  }

  addUser() {
    const dialogRef = this.dialog.open(DialogUserCreateComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.loadUsers();
      this.gridApi.sizeColumnsToFit();
    });
  }

  onResize() {
    this.gridApi.sizeColumnsToFit();
    //this.columnApi.autoSizeAllColumns(false);
  }

  onRowSelected(event: RowSelectedEvent) {
    this.router.navigateByUrl('/account/' + event.data.id);
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

}
