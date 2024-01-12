import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicosInsertUpdateComponent } from './medicos-insert-update.component';

describe('MedicosInsertUpdateComponent', () => {
  let component: MedicosInsertUpdateComponent;
  let fixture: ComponentFixture<MedicosInsertUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicosInsertUpdateComponent]
    });
    fixture = TestBed.createComponent(MedicosInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
