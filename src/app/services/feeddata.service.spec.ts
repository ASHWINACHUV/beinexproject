import { TestBed } from '@angular/core/testing';

import { FeeddataService } from './feeddata.service';

describe('FeeddataService', () => {
  let service: FeeddataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeeddataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
