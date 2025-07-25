import { TestBed } from '@angular/core/testing';

import { ApiGetList } from './api-get-list';

describe('ApiGetList', () => {
  let service: ApiGetList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGetList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
