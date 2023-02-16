import { TestBed } from '@angular/core/testing';

import { TokenValidateGuard } from './token-validate.guard';

describe('TokenValidateGuard', () => {
  let guard: TokenValidateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TokenValidateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
