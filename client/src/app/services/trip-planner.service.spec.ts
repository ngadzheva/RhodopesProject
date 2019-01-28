import { TestBed } from '@angular/core/testing';

import { TripPlannerService } from './trip-planner.service';

describe('TripPlannerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TripPlannerService = TestBed.get(TripPlannerService);
    expect(service).toBeTruthy();
  });
});
