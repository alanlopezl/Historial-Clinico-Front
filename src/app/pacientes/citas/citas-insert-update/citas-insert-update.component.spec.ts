import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasInsertUpdateComponent } from './citas-insert-update.component';

describe('CitasInsertUpdateComponent', () => {
  let component: CitasInsertUpdateComponent;
  let fixture: ComponentFixture<CitasInsertUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitasInsertUpdateComponent]
    });
    fixture = TestBed.createComponent(CitasInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
