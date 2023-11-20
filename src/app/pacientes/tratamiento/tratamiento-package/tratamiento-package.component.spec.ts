import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoPackageComponent } from './tratamiento-package.component';

describe('TratamientoPackageComponent', () => {
  let component: TratamientoPackageComponent;
  let fixture: ComponentFixture<TratamientoPackageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TratamientoPackageComponent]
    });
    fixture = TestBed.createComponent(TratamientoPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
