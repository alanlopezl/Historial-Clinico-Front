import { TestBed } from '@angular/core/testing';

import { PackageEnfermedadService } from './package-enfermedad.service';

describe('PackageEnfermedadService', () => {
  let service: PackageEnfermedadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageEnfermedadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
