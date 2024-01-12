import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadInsertUpdateComponent } from './especialidad-insert-update.component';

describe('EspecialidadInsertUpdateComponent', () => {
  let component: EspecialidadInsertUpdateComponent;
  let fixture: ComponentFixture<EspecialidadInsertUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspecialidadInsertUpdateComponent]
    });
    fixture = TestBed.createComponent(EspecialidadInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
