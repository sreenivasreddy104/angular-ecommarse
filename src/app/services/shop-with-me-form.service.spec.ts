import { TestBed } from '@angular/core/testing';

import { ShopWithMeFormService } from './shop-with-me-form.service';

describe('ShopWithMeFormService', () => {
  let service: ShopWithMeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopWithMeFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
