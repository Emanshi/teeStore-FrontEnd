import { TestBed } from '@angular/core/testing';

import { CartGuardService } from './cart-guard.service';

describe('CartGuardService', () => {
  let service: CartGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
