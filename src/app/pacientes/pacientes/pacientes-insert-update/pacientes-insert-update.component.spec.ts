import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesInsertUpdateComponent } from './pacientes-insert-update.component';

describe('PacientesInsertUpdateComponent', () => {
  let component: PacientesInsertUpdateComponent;
  let fixture: ComponentFixture<PacientesInsertUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacientesInsertUpdateComponent]
    });
    fixture = TestBed.createComponent(PacientesInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
