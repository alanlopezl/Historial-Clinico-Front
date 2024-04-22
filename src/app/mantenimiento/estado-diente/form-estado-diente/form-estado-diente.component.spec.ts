import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEstadoDienteComponent } from './form-estado-diente.component';

describe('FormEstadoDienteComponent', () => {
  let component: FormEstadoDienteComponent;
  let fixture: ComponentFixture<FormEstadoDienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEstadoDienteComponent]
    });
    fixture = TestBed.createComponent(FormEstadoDienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
