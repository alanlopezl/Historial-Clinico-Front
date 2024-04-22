import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoDienteComponent } from './estado-diente.component';

describe('EstadoDienteComponent', () => {
  let component: EstadoDienteComponent;
  let fixture: ComponentFixture<EstadoDienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadoDienteComponent]
    });
    fixture = TestBed.createComponent(EstadoDienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
