import { TestBed } from '@angular/core/testing';

import { EspecialidadPackageService } from './especialidad-package.service';

describe('EspecialidadPackageService', () => {
  let service: EspecialidadPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspecialidadPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
