import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DienteComponent } from './diente.component';

describe('DienteComponent', () => {
  let component: DienteComponent;
  let fixture: ComponentFixture<DienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DienteComponent]
    });
    fixture = TestBed.createComponent(DienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
