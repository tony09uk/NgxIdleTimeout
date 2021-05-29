import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxIdleTimeoutComponent } from './ngx-idle-timeout.component';

describe('NgxIdleTimeoutComponent', () => {
  let component: NgxIdleTimeoutComponent;
  let fixture: ComponentFixture<NgxIdleTimeoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxIdleTimeoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxIdleTimeoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
