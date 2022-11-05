import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {zip} from 'rxjs';
import {Page} from 'src/assets/models/page';
import {University} from 'src/assets/models/university';
import {User} from 'src/assets/models/user';
import {PageService} from 'src/assets/service/page.service';
import {UniversityService} from 'src/assets/service/university.service';
import {UserService} from 'src/assets/service/user.service';
import {PageCardConfig} from '../page/page-card/page-card.component';
import {UniversityCardConfig} from '../university/university-card/university-card.component';
import {UserCardConfig} from '../user/user-card/user-card.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private pageService: PageService,
              private universityService: UniversityService,
              private userService: UserService) {
  }

  searchControl = new FormControl<string>('', []);
  pages: Page[] = [];
  universities: University[] = [];
  users: User[] = [];

  pageCardConfig: PageCardConfig = {
    useSecondaryColor: false,
    showGoToButton: true,
    showDescription: false,
    showUniversity: true,
    showCreatedOn: false,
    showAuthor: true
  };

  universityCardConfig: UniversityCardConfig = {
    useSecondaryColor: false,
    showDescription: true,
    showGoToButton: true
  };

  userCardConfig: UserCardConfig = {
    useSecondaryColor: true,
    showGoToButton: true,
    showSettings: false
  };

  ngOnInit(): void {
  }

  search() {
    zip(this.pageService.searchPages(this.searchControl.value ?? ''),
      this.universityService.searchUniversities(this.searchControl.value ?? ''),
      this.userService.searchUsers(this.searchControl.value ?? ''))
      .subscribe({
        next: ([pages, universities, users]) => {
          this.pages = pages;
          this.universities = universities;
          this.users = users;
        },
        error: err => {
        }
      });
  }

}
