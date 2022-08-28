import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { university } from 'src/assets/models/university';
import { UniversityService } from 'src/assets/service/university.service';

@Component({
  selector: 'app-university-details',
  templateUrl: './university-details.component.html',
  styleUrls: ['./university-details.component.scss']
})
export class UniversityDetailsComponent implements OnInit {

  public university!: university;
  public id: Number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private universitieService: UniversityService) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void{
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('universityId'));
    this.loadUniversitie();
  }

  loadUniversitie() {
    this.universitieService.getUniversity(this.id)
    .subscribe(res => {
      this.university = res;
      console.log(res);
    });
  }

}


