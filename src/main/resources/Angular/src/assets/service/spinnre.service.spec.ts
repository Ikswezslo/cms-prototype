import { TestBed } from '@angular/core/testing';

import { SpinnreService } from './spinnre.service';

describe('SpinnreService', () => {
  let service: SpinnreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
