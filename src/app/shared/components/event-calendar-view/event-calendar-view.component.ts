import { Component, Input } from '@angular/core';
import { MdDialog } from '@angular/material';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import * as isSameDay from 'date-fns/is_same_day';
import * as isSameMonth from 'date-fns/is_same_month';
import { Observable } from 'rxjs/Observable';

import { BaseEventViewComponent } from '../base-event-view.component';
import { EventsService, EventDetail } from './../../services/events.service';

@Component({
  selector: 'app-event-calendar-view',
  templateUrl: './event-calendar-view.component.html',
  styleUrls: ['./event-calendar-view.component.scss']
})
export class EventCalendarViewComponent extends BaseEventViewComponent {
  @Input() events: EventDetail[];

  view: 'month' | 'week' | 'day' = 'month';
  viewDate = new Date();
  activeDayIsOpen = false;

  readonly calendarEvents: Observable<CalendarEvent<EventDetail>[]>;

  readonly actions: CalendarEventAction[] = [
    {
      label: '<i class="material-icons white-text">create</i>',
      onClick: ({ event }: { event: CalendarEvent<EventDetail> }): void => {
        this.editEvent(event.meta);
      }
    },
    {
      label: '<i class="material-icons white-text">delete</i>',
      onClick: ({ event }: { event: CalendarEvent<EventDetail> }): void => {
        this.deleteEvent(event.meta);
      }
    }
  ];

  constructor(dialogService: MdDialog, eventsService: EventsService) {
    super(dialogService, eventsService);

    this.calendarEvents = this.getCalendarEvents();
  }

  dayClick({ date, events }: { date: Date; events: CalendarEvent<EventDetail>[] }) {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  private getCalendarEvents() {
    return this.getChanges(() => this.events)
      .map(events => events.map(event => this.toCalendarEvent(event)));
  }

  private toCalendarEvent(event: EventDetail) {
    return {
      start: event.start,
      end: event.end,
      title: event.title,
      color: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
      },
      actions: this.actions,
      allDay: false,
      cssClass: '',
      resizable: {
          beforeStart: false,
          afterEnd: false,
      },
      draggable: false,
      meta: event
    } as CalendarEvent<EventDetail>;
  }
}
