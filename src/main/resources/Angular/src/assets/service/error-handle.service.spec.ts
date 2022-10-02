import { TestBed } from '@angular/core/testing';

import { ErrorHandleService } from './error-handle.service';

describe('ErrorHandleService', () => {
  let service: ErrorHandleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
