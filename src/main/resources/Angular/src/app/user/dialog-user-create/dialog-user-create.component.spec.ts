import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserCreateComponent } from './dialog-user-create.component';

describe('DialogUserCreateComponent', () => {
  let component: DialogUserCreateComponent;
  let fixture: ComponentFixture<DialogUserCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUserCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
