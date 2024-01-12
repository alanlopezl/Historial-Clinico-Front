import { TestBed } from '@angular/core/testing';

import { MedicosPackageService } from './medicos-package.service';

describe('MedicosPackageService', () => {
  let service: MedicosPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicosPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
