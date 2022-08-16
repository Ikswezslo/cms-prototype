import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { universitie } from '../models/universitie';
import { PageService } from '../service/page.service';

@Component({
  selector: 'app-universitie-list',
  templateUrl: './universitie-list.component.html',
  styleUrls: ['./universitie-list.component.scss']
})
export class UniversitieListComponent implements OnInit {

  universities: universitie[] = [];
  public selected = false;

  constructor(
    private http: HttpClient,
    private universitieService: PageService) {}

  ngOnInit(): void {
    this.loadUniversities();
  }

  loadUniversities(showHidden: Boolean = false) {
    this.universitieService.getUniversities()
      .subscribe(res => {
        this.universities = showHidden ? res : res.filter(element => !element.hidden);
      });
  }
}
