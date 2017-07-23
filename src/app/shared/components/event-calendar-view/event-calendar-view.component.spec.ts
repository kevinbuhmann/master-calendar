import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCalendarViewComponent } from './event-calendar-view.component';

describe('EventCalendarViewComponent', () => {
  let component: EventCalendarViewComponent;
  let fixture: ComponentFixture<EventCalendarViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCalendarViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCalendarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
