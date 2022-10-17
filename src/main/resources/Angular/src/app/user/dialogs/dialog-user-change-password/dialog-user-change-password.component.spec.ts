import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogUserChangePasswordComponent} from './dialog-user-change-password.component';

describe('DialogUserChangePasswordComponent', () => {
  let component: DialogUserChangePasswordComponent;
  let fixture: ComponentFixture<DialogUserChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogUserChangePasswordComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogUserChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
