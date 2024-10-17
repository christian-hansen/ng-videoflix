import { TestBed } from '@angular/core/testing';

import { VideoresolverService } from './videoresolver.service';

describe('VideoresolverService', () => {
  let service: VideoresolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoresolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
