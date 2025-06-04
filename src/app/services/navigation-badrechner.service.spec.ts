import { TestBed } from '@angular/core/testing';

import { NavigationBadrechnerService } from './navigation-badrechner.service';

describe('NavigationBadrechnerService', () => {
  let service: NavigationBadrechnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationBadrechnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
