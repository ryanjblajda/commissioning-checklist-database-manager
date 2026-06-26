import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicePane } from './device-pane';

describe('DevicePane', () => {
  let component: DevicePane;
  let fixture: ComponentFixture<DevicePane>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevicePane],
    }).compileComponents();

    fixture = TestBed.createComponent(DevicePane);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
