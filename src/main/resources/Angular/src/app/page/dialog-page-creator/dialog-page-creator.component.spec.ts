import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPageCreatorComponent } from './dialog-page-creator.component';

describe('DialogPageCreatorComponent', () => {
  let component: DialogPageCreatorComponent;
  let fixture: ComponentFixture<DialogPageCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPageCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPageCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
