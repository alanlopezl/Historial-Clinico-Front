import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdateEstadoComponent } from './insert-update-estado.component';

describe('InsertUpdateEstadoComponent', () => {
  let component: InsertUpdateEstadoComponent;
  let fixture: ComponentFixture<InsertUpdateEstadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertUpdateEstadoComponent]
    });
    fixture = TestBed.createComponent(InsertUpdateEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
