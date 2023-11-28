import { TestBed } from '@angular/core/testing';

import { PackegeCuestionarioService } from './packege-cuestionario.service';

describe('PackegeCuestionarioService', () => {
  let service: PackegeCuestionarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackegeCuestionarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
