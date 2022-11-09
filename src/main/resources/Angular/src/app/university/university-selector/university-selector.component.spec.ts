import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitySelectorComponent } from './university-selector.component';

describe('UniversitySelectorComponent', () => {
  let component: UniversitySelectorComponent;
  let fixture: ComponentFixture<UniversitySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversitySelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversitySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
