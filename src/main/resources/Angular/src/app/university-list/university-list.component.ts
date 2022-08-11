import { Component, OnInit } from '@angular/core';
import { university } from '../university';

@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.component.html',
  styleUrls: ['./university-list.component.scss']
})
export class UniversityListComponent implements OnInit {

  universitys = university;

  constructor() { }

  ngOnInit(): void {
  }

}
