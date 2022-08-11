import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { university } from '../university';

@Component({
  selector: 'app-university-details',
  templateUrl: './university-details.component.html',
  styleUrls: ['./university-details.component.scss']
})
export class UniversityDetailsComponent implements OnInit {

  university: university | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const universityIdFromRoute = Number(routeParams.get('universityId'));

    // Find the product that correspond with the id provided in route.
    this.university = university.find(university => university.id === universityIdFromRoute);
  }

}
