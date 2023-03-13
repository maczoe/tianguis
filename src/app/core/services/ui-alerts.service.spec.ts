import { TestBed } from '@angular/core/testing';

import { UiAlertsService } from './ui-alerts.service';

describe('UiAlertsService', () => {
  let service: UiAlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiAlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
