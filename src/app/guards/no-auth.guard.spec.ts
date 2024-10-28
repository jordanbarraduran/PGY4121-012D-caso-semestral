import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { noAuthGuard } from './no-auth.guard';

describe('noAuthGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => noAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
