import { TestBed } from '@angular/core/testing';

import { LeitnerPlanningService } from './leitner.planning.service';

describe('LeitnerPlanningService', () => {
  let service: LeitnerPlanningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeitnerPlanningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
