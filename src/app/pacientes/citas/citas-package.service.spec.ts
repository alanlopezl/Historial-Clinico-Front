import { TestBed } from '@angular/core/testing';

import { CitasPackageService } from './citas-package.service';

describe('CitasPackageService', () => {
  let service: CitasPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitasPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
