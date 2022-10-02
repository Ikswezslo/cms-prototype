import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {University} from 'src/assets/models/university';
import {UniversityService} from 'src/assets/service/university.service';
import {User} from "../../../assets/models/user";
import {UserService} from "../../../assets/service/user.service";
import {PageCardConfig} from "../../page/page-card/page-card.component";
import {UserCardConfig} from "../../user/user-card/user-card.component";
import {UniversityCardConfig} from "../university-card/university-card.component";

@Component({
  selector: 'app-university-details',
  templateUrl: './university-details.component.html',
  styleUrls: ['./university-details.component.scss']
})
export class UniversityDetailsComponent implements OnInit {

  public university!: University;
  public id: Number = 0;
  public loggedUser!: User;

  userCardConfig: UserCardConfig = {
    useSecondaryColor: true,
    showGoToButton: true,
    showSettings: false
  };

  secondaryCardConfig: PageCardConfig = {
    useSecondaryColor: true,
    showGoToButton: true,
    showDescription: true,
    showUniversity: false,
    showCreatedOn: true,
    showAuthor: true
  };
  universityCardConfig: UniversityCardConfig = {
    useSecondaryColor: false,
    showGoToButton: true,
    showDescription: true,
  }

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
    this.universityService.modifyUniversityHiddenField(this.university.id, !this.university.hidden).subscribe(() => {
      this.university.hidden = !this.university.hidden;
    });

  }

  getLoggedUser() {
    this.userService.getLoggedUser()
      .subscribe(res => {
        this.loggedUser = res;
      })
  }

}


