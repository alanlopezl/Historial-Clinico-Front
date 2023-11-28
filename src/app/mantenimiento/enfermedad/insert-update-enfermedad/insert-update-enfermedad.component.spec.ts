import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdateEnfermedadComponent } from './insert-update-enfermedad.component';

describe('InsertUpdateEnfermedadComponent', () => {
  let component: InsertUpdateEnfermedadComponent;
  let fixture: ComponentFixture<InsertUpdateEnfermedadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertUpdateEnfermedadComponent]
    });
    fixture = TestBed.createComponent(InsertUpdateEnfermedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
