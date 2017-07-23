import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAgendaViewComponent } from './event-agenda-view.component';

describe('EventAgendaViewComponent', () => {
  let component: EventAgendaViewComponent;
  let fixture: ComponentFixture<EventAgendaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventAgendaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAgendaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
