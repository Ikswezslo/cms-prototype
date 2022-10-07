import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogUserChangeUsernameComponent} from './dialog-user-change-username.component';

describe('DialogUserChangeUsernameComponent', () => {
  let component: DialogUserChangeUsernameComponent;
  let fixture: ComponentFixture<DialogUserChangeUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogUserChangeUsernameComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogUserChangeUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
