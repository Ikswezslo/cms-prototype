import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitieDetailsComponent } from './universitie-details.component';

describe('UniversitieDetailsComponent', () => {
  let component: UniversitieDetailsComponent;
  let fixture: ComponentFixture<UniversitieDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversitieDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversitieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
