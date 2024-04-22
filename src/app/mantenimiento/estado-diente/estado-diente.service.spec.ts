import { TestBed } from '@angular/core/testing';

import { EstadoDienteService } from './estado-diente.service';

describe('EstadoDienteService', () => {
  let service: EstadoDienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoDienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
