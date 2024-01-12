import { TestBed } from '@angular/core/testing';

import { EstadoPackageService } from './estado-package.service';

describe('EstadoPackageService', () => {
  let service: EstadoPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
