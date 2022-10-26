import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogUserAddUniversityComponent} from './dialog-user-add-university.component';

describe('DialogUserAddUniversityComponent', () => {
  let component: DialogUserAddUniversityComponent;
  let fixture: ComponentFixture<DialogUserAddUniversityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogUserAddUniversityComponent]
    })
        .compileComponents();

    fixture = TestBed.createComponent(DialogUserAddUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
