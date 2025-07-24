import { TestBed } from '@angular/core/testing';

import { ApiTest1 } from './api-test1';

describe('ApiTest1', () => {
  let service: ApiTest1;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTest1);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
