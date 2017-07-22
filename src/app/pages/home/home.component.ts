import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseComponent } from './../../base.component';
import { CalendarEvent, EventsService } from './../../shared/services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent {
  readonly events: Observable<CalendarEvent[]>;

  constructor(private eventsService: EventsService) {
    super();

    this.events = this.eventsService.getEvents();
  }
}
