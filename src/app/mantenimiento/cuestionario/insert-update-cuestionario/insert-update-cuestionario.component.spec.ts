import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdateCuestionarioComponent } from './insert-update-cuestionario.component';

describe('InsertUpdateCuestionarioComponent', () => {
  let component: InsertUpdateCuestionarioComponent;
  let fixture: ComponentFixture<InsertUpdateCuestionarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertUpdateCuestionarioComponent]
    });
    fixture = TestBed.createComponent(InsertUpdateCuestionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
