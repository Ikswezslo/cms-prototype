import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDetailsComponent } from './page-details.component';

describe('PageDetailsComponent', () => {
  let component: PageDetailsComponent;
  let fixture: ComponentFixture<PageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
