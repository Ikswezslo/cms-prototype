import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../assets/models/user";
import {University} from "../../../assets/models/university";

@Component({
  selector: 'app-university-card',
  templateUrl: './university-card.component.html',
  styleUrls: ['./university-card.component.scss']
})
export class UniversityCardComponent implements OnInit {

  @Input() university?: University;
  @Input() loggedUser?: User;

  constructor() {
  }

  ngOnInit(): void {
  }

}
