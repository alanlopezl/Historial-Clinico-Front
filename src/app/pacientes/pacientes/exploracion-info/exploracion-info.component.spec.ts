import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploracionInfoComponent } from './exploracion-info.component';

describe('ExploracionInfoComponent', () => {
  let component: ExploracionInfoComponent;
  let fixture: ComponentFixture<ExploracionInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploracionInfoComponent]
    });
    fixture = TestBed.createComponent(ExploracionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
