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

  public columnDefs: ColDef[] = [];
  public defaultColDef: ColDef = {};
  public noRowsTemplate: string = "";
  users: User[] = [];
  data: UserGridItem[] = [];
  gridApi!: GridApi;
  columnApi!: ColumnApi;

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private userService: UserService,
    private spinnerService: SpinnerService,
    public dialog: MatDialog,
    private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(() => {
      this.translateColumnDefs();
      this.translateData();
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
          this.translateData();
        },
        error: err => {
          this.spinnerService.hide();
          this.dialogService.openDataErrorDialog();
        }
      });
  }

  translateData() {
    this.data = this.users.map(user => {
      const userItem = user as UserGridItem;
      switch (user.accountType) {
        case "ADMIN":
          userItem.accountTypeTranslated = this.translate.instant("MAIN_ADMIN");
          break;
        case "MODERATOR":
          userItem.accountTypeTranslated = this.translate.instant("UNIVERSITY_ADMIN");
          break;
        case "USER":
          userItem.accountTypeTranslated = this.translate.instant("USER");
          break;
      }
      if (userItem.enabled) {
        userItem.enabledTranslated = this.translate.instant("YES");
      } else {
        userItem.enabledTranslated = this.translate.instant("NO");
      }
      return userItem;
    });
  }

  translateColumnDefs() {
    this.columnDefs = [
      {
        headerName: this.translate.instant("ID"), field: 'id', flex: 0.5,
        filter: 'agNumberColumnFilter'
      },
      {
        headerName: this.translate.instant("USERNAME"), field: 'username',
      },
      {
        headerName: this.translate.instant("FIRST_NAME"), field: 'firstName',
      },
      {
        headerName: this.translate.instant("LAST_NAME"), field: 'lastName',
      },
      {
        headerName: this.translate.instant("ROLE"), field: 'accountTypeTranslated',
      },
      {
        headerName: this.translate.instant("ENABLED"), field: 'enabledTranslated', flex: 0.75,
      }
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

  addUser() {
    const dialogRef = this.dialog.open(DialogUserCreateComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.loadUsers();
    });
  }

  onRowSelected(event: RowSelectedEvent) {
    this.router.navigateByUrl('/account/' + event.data.id);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }
}

interface UserGridItem extends User {
  enabledTranslated: string;
  accountTypeTranslated: string;
}
