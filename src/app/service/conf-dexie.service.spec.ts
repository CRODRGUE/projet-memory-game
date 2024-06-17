import { TestBed } from '@angular/core/testing';

import { ConfDexieService } from './conf-dexie.service';

describe('ConfDexieService', () => {
  let service: ConfDexieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfDexieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
