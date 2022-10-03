import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogPageCreateComponent} from './dialog-page-create.component';

describe('DialogPageCreateComponent', () => {
  let component: DialogPageCreateComponent;
  let fixture: ComponentFixture<DialogPageCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPageCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
