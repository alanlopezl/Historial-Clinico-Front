import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPersonaInsertUpdateComponent } from './tipo-persona-insert-update.component';

describe('TipoPersonaInsertUpdateComponent', () => {
  let component: TipoPersonaInsertUpdateComponent;
  let fixture: ComponentFixture<TipoPersonaInsertUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoPersonaInsertUpdateComponent]
    });
    fixture = TestBed.createComponent(TipoPersonaInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
