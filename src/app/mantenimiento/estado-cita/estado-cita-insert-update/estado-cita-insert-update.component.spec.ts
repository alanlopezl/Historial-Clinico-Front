import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCitaInsertUpdateComponent } from './estado-cita-insert-update.component';

describe('EstadoCitaInsertUpdateComponent', () => {
  let component: EstadoCitaInsertUpdateComponent;
  let fixture: ComponentFixture<EstadoCitaInsertUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadoCitaInsertUpdateComponent]
    });
    fixture = TestBed.createComponent(EstadoCitaInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
