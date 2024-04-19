import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailDeclineComponent } from './mail-decline.component';

describe('MailDeclineComponent', () => {
  let component: MailDeclineComponent;
  let fixture: ComponentFixture<MailDeclineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailDeclineComponent]
    });
    fixture = TestBed.createComponent(MailDeclineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
