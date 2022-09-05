import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ColDef, RowSelectedEvent } from 'ag-grid-community';
import { User } from 'src/assets/models/user';
import { UserService } from 'src/assets/service/user.service';
import { DialogUserCreateComponent } from '../dialog-user-create/dialog-user-create.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  public selected = true;

  public columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'username' },
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'universityID' },
    { field: 'email' },
    { field: 'accountType' },
  ];

  public defaultColDef: ColDef = {
    width: 300,
    editable: false,
    filter: 'agTextColumnFilter',
    suppressMovable: true,
    type: 'textColumn'
};

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadColumn();
  }
  

  loadUsers(showHidden: Boolean = true) {
    this.userService.getUsers()
      .subscribe(res => {
        this.users = res;
    });
  }
  loadColumn() {
    this.columnDefs = [
      { field: 'id' },
      { field: 'username' },
      { field: 'firstName' },
      { field: 'lastName' },
      { field: 'universityID' },
      { field: 'email' },
      { field: 'accountType' },
    ];
    
  }
  
  xxx() {
    
  }

  addUser() {
    const dialogRef = this.dialog.open(DialogUserCreateComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      this.loadUsers();
    });
  }
  
  onRowSelected(event: RowSelectedEvent) {
    this.router.navigateByUrl('/account/' + event.data.id);
  }
  onGridReady(params: any) {
    params.columnApi.autoSizeAllColumns();
  }

}
