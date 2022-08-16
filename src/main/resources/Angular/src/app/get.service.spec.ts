import { TestBed } from '@angular/core/testing';

import { GetService } from './service/get.service';

describe('GetService', () => {
  let service: GetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
