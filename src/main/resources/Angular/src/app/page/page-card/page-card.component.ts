import {Component, Input, OnInit} from '@angular/core';
import {Page} from "../../../assets/models/page";
import {SecurityService} from "../../../assets/service/security.service";

@Component({
  selector: 'app-page-card',
  templateUrl: './page-card.component.html',
  styleUrls: ['./page-card.component.scss']
})
export class PageCardComponent implements OnInit {

  @Input() page?: Page;
  @Input() config: PageCardConfig = {} as PageCardConfig

  constructor(public securityService: SecurityService) {
  }

  ngOnInit(): void {
  }

}

export interface PageCardConfig {
  useSecondaryColor: boolean;
  showLink: boolean;
  showDescription: boolean;
  showUniversity: boolean;
  showCreatedOn: boolean;
  showAuthor: boolean;
}
