import { TestBed } from '@angular/core/testing';

import { DevKitService } from './dev-kit.service';

describe('DevKitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevKitService = TestBed.get(DevKitService);
    expect(service).toBeTruthy();
  });
});
