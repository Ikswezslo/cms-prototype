import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCardListComponent } from './page-card-list.component';

describe('PageCardListComponent', () => {
  let component: PageCardListComponent;
  let fixture: ComponentFixture<PageCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageCardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
