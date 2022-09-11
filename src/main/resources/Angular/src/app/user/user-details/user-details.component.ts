import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/assets/models/page';
import { User } from 'src/assets/models/user';
import { PageService } from 'src/assets/service/page.service';
import { UserService } from 'src/assets/service/user.service';
import { DialogUserCreateComponent } from '../dialog-user-create/dialog-user-create.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Input() settings: boolean = false;
  @Input() settingsId!: Number;
  public pages!: Page[];
  public user!: User;
  public id!: Number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog,
    private pageService: PageService) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void{
    console.log("tutaj");
    const routeParams = this.route.snapshot.paramMap;
    this.id = this.settingsId ??  Number(routeParams.get('userId'));
    this.loadUser();
    this.loadPages(this.id);
  }

  loadUser() {
    this.userService.getUser(this.id)
    .subscribe(res => {
      this.user = res;
      this.user.accountType === "ADMIN"
    });
  }
  
  loadPages(userId: Number) {
    this.pageService.getPages()
      .subscribe(res => {
        this.pages = res.filter(element => element.creator.id == userId);
      });
  }

  startEdit() {
    let dialogData = {
      data: {
        edit: true,
        user: this.user
      }
    }

    const dialogRef = this.dialog.open(DialogUserCreateComponent, dialogData);

    // dialogRef.afterClosed().subscribe(result => {
    //   this.loadUsers();
    // });
  }
}
