import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTemplateLoadComponent } from './dialog-template-load.component';

describe('DialogTemplateLoadComponent', () => {
  let component: DialogTemplateLoadComponent;
  let fixture: ComponentFixture<DialogTemplateLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTemplateLoadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTemplateLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
