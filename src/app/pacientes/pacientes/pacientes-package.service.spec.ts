import { TestBed } from '@angular/core/testing';

import { PacientesPackageService } from './pacientes-package.service';

describe('PacientesPackageService', () => {
  let service: PacientesPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacientesPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
