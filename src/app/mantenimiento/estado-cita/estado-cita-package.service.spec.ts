import { TestBed } from '@angular/core/testing';

import { EstadoCitaPackageService } from './estado-cita-package.service';

describe('EstadoCitaPackageService', () => {
  let service: EstadoCitaPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoCitaPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
