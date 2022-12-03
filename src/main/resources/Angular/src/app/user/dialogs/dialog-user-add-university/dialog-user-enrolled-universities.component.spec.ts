import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogUserEnrolledUniversitiesComponent} from './dialog-user-enrolled-universities.component';

describe('DialogUserAddUniversityComponent', () => {
  let component: DialogUserEnrolledUniversitiesComponent;
  let fixture: ComponentFixture<DialogUserEnrolledUniversitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogUserEnrolledUniversitiesComponent]
    })
        .compileComponents();

    fixture = TestBed.createComponent(DialogUserEnrolledUniversitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
