import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogUserChangeAccountTypeComponent} from './dialog-user-change-account-type.component';

describe('DialogUserChangeAccountTypeComponent', () => {
  let component: DialogUserChangeAccountTypeComponent;
  let fixture: ComponentFixture<DialogUserChangeAccountTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogUserChangeAccountTypeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogUserChangeAccountTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
