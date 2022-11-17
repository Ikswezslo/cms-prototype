import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTemplateCreateComponent } from './dialog-template-create.component';

describe('DialogTemplateCreateComponent', () => {
  let component: DialogTemplateCreateComponent;
  let fixture: ComponentFixture<DialogTemplateCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTemplateCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTemplateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
