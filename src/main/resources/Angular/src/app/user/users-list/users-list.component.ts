import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ColDef, GridApi, RowSelectedEvent} from 'ag-grid-community';
import {User} from 'src/assets/models/user';
import {UserService} from 'src/assets/service/user.service';
import {DialogUserCreateComponent} from '../dialog-user-create/dialog-user-create.component';

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


  constructor(
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadColumn();
  }


  loadUsers() {
    this.userService.getUsers()
      .subscribe(res => {
        this.users = res;
      });
  }

  loadColumn() {
    this.columnDefs = [
      { field: 'id', minWidth: 100, width:100},
      { field: 'username', minWidth: 150 },
      { field: 'firstName', minWidth: 150 },
      { field: 'lastName', minWidth: 150 }
    ];
    this.defaultColDef = {
      width: 300,
      editable: false,
      filter: 'agTextColumnFilter',
      suppressMovable: true,
      type: 'textColumn'
    };
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

  onRowSelected(event: RowSelectedEvent) {
    this.router.navigateByUrl('/account/' + event.data.id);
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

}
