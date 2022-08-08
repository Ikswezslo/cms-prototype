import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { university } from "../university";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  universitys = university;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getAnnounce() {
    this.http.get('http://127.0.0.1:8080/retrieve_data')
      .subscribe(res => {
        console.log(res);
      });
  }

}
