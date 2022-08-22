import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { universitie } from '../models/universitie';
import { PageService } from '../service/page.service';

@Component({
  selector: 'app-universitie-details',
  templateUrl: './universitie-details.component.html',
  styleUrls: ['./universitie-details.component.scss']
})
export class UniversitieDetailsComponent implements OnInit {

  public universitie!: universitie;
  public id: Number = 0;

  constructor(
    private route: ActivatedRoute,
    private universitieService: PageService) {
  }

  ngOnInit(): void{
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('universitieId'));
    this.loadUniversitie();
  }

  loadUniversitie() {
    this.universitieService.getUniversitie(this.id)
    .subscribe(res => {
      this.universitie = res;
    });
  }

}


