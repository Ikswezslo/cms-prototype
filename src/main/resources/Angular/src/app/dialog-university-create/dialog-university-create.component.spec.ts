import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUniversityCreateComponent } from './dialog-university-create.component';

describe('DialogUniversityCreateComponent', () => {
  let component: DialogUniversityCreateComponent;
  let fixture: ComponentFixture<DialogUniversityCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUniversityCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUniversityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
