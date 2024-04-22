import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTratamientoComponent } from './form-tratamiento.component';

describe('FormTratamientoComponent', () => {
  let component: FormTratamientoComponent;
  let fixture: ComponentFixture<FormTratamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormTratamientoComponent]
    });
    fixture = TestBed.createComponent(FormTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
