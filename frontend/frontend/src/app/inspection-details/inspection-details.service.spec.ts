import { TestBed } from '@angular/core/testing';

import { InspectionDetailsService } from './inspection-details.service';

describe('InspectionDetailsService', () => {
  let service: InspectionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspectionDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
