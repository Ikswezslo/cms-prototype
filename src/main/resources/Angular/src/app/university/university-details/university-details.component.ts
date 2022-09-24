import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {University} from 'src/assets/models/university';
import {UniversityService} from 'src/assets/service/university.service';
import {User} from "../../../assets/models/user";
import {UserService} from "../../../assets/service/user.service";

@Component({
  selector: 'app-university-details',
  templateUrl: './university-details.component.html',
  styleUrls: ['./university-details.component.scss']
})
export class UniversityDetailsComponent implements OnInit {

  public university!: University;
  public id: Number = 0;
  public loggedUser!: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private universityService: UniversityService,
    private userService: UserService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('universityId'));
    this.getLoggedUser();
    this.loadUniversity();
  }

  loadUniversity() {
    this.universityService.getUniversity(this.id)
      .subscribe(res => {
        this.university = res;
        console.log(res);
      });
  }

  hiddenUniversity() {
    this.universityService.hideUniversity(this.university.id, !this.university.hidden).subscribe(() => {
      this.loadUniversity();
    });

  }

  getLoggedUser() {
    this.userService.getLoggedUser()
      .subscribe(res => {
        this.loggedUser = res;
      })
  }

}


