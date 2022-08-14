import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitieListComponent } from './universitie-list.component';

describe('UniversitieListComponent', () => {
  let component: UniversitieListComponent;
  let fixture: ComponentFixture<UniversitieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversitieListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversitieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
