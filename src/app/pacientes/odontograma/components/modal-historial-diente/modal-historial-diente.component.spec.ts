import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistorialDienteComponent } from './modal-historial-diente.component';

describe('ModalHistorialDienteComponent', () => {
  let component: ModalHistorialDienteComponent;
  let fixture: ComponentFixture<ModalHistorialDienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalHistorialDienteComponent]
    });
    fixture = TestBed.createComponent(ModalHistorialDienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
