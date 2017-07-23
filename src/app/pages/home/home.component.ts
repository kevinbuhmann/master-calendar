import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { BaseComponent } from './../../base.component';
import { filterEvents, showAllEventFilter, EventFilter } from './../../shared/helpers/event-filter.helpers';
import { EventsService, EventDetail } from './../../shared/services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent {
  filter = showAllEventFilter;

  readonly viewDate = new Date();
  readonly events: Observable<EventDetail[]>;
  readonly totalEventCount: Observable<number>;
  readonly filterChanges = new BehaviorSubject(showAllEventFilter);

  constructor(private eventsService: EventsService) {
    super();

    const eventChanges = this.eventsService.getEvents().shareReplay(1);

    this.events = this.getEvents(eventChanges).shareReplay(1);
    this.totalEventCount = this.getTotalEventCount(eventChanges).shareReplay(1);
  }

  filterChange(fitler: EventFilter) {
    this.filter = fitler;
    this.filterChanges.next(fitler);
  }

  private getEvents(eventChanges: Observable<EventDetail[]>) {
    return Observable.combineLatest(eventChanges, this.filterChanges)
      .map(([events, filter]) => filterEvents(events, filter));
  }

  private getTotalEventCount(eventChanges: Observable<EventDetail[]>) {
    return eventChanges
      .map(events => events.length);
  }
}
