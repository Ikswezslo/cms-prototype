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
  @Input() config: UniversityCardConfig = {} as UniversityCardConfig

  constructor() {
  }

  ngOnInit(): void {
  }

}

export interface UniversityCardConfig {
  useSecondaryColor: boolean;
  showDescription: boolean;
  showGoToButton: boolean;
}