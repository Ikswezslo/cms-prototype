import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogUserUpdateComponent} from './dialog-user-update.component';

describe('DialogUserUpdateComponent', () => {
  let component: DialogUserUpdateComponent;
  let fixture: ComponentFixture<DialogUserUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogUserUpdateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
