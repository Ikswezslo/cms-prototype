import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyWordsSelectorsComponent } from './key-words-selectors.component';

describe('KeyWordsSelectorsComponent', () => {
  let component: KeyWordsSelectorsComponent;
  let fixture: ComponentFixture<KeyWordsSelectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyWordsSelectorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyWordsSelectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
