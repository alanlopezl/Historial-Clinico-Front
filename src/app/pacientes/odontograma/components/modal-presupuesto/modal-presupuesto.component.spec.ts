import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPresupuestoComponent } from './modal-presupuesto.component';

describe('ModalPresupuestoComponent', () => {
  let component: ModalPresupuestoComponent;
  let fixture: ComponentFixture<ModalPresupuestoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalPresupuestoComponent]
    });
    fixture = TestBed.createComponent(ModalPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
