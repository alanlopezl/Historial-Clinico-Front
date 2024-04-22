import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoDienteComponent } from './tratamiento-diente.component';

describe('TratamientoDienteComponent', () => {
  let component: TratamientoDienteComponent;
  let fixture: ComponentFixture<TratamientoDienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TratamientoDienteComponent]
    });
    fixture = TestBed.createComponent(TratamientoDienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
