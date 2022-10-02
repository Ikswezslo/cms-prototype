import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UniversityCardComponent} from './university-card.component';

describe('UniversityCardComponent', () => {
  let component: UniversityCardComponent;
  let fixture: ComponentFixture<UniversityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UniversityCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UniversityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
