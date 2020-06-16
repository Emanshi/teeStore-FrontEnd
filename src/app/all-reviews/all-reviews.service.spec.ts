import { TestBed } from '@angular/core/testing';

import { AllReviewsService } from './all-reviews.service';

describe('AllReviewsService', () => {
  let service: AllReviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllReviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
