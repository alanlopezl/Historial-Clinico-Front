import { TestBed } from '@angular/core/testing';

import { TipoPersonaPackageService } from './tipo-persona-package.service';

describe('TipoPersonaPackageService', () => {
  let service: TipoPersonaPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoPersonaPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
