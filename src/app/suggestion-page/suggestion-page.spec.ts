import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionPage } from './suggestion-page';

describe('SuggestionPage', () => {
  let component: SuggestionPage;
  let fixture: ComponentFixture<SuggestionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SuggestionPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
