import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTemplateChangeNameComponent } from './dialog-template-change-name.component';

describe('DialogTemplateChangeNameComponent', () => {
  let component: DialogTemplateChangeNameComponent;
  let fixture: ComponentFixture<DialogTemplateChangeNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTemplateChangeNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTemplateChangeNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
