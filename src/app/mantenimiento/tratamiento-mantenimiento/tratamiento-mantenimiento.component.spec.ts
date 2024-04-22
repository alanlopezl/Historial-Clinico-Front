import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoMantenimientoComponent } from './tratamiento-mantenimiento.component';

describe('TratamientoMantenimientoComponent', () => {
  let component: TratamientoMantenimientoComponent;
  let fixture: ComponentFixture<TratamientoMantenimientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TratamientoMantenimientoComponent]
    });
    fixture = TestBed.createComponent(TratamientoMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
