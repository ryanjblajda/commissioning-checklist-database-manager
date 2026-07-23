import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultMessage } from './result-message';

describe('ResultMessage', () => {
  let component: ResultMessage;
  let fixture: ComponentFixture<ResultMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultMessage],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultMessage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
