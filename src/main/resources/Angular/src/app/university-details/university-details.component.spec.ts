import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityDetailsComponent } from './university-details.component';

describe('UniversityDetailsComponent', () => {
  let component: UniversityDetailsComponent;
  let fixture: ComponentFixture<UniversityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversityDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
