import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseComponent } from './../../base.component';
import { EventsService, EventDetail } from './../../shared/services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent {
  readonly events: Observable<EventDetail[]>;
  readonly viewDate = new Date();

  constructor(private eventsService: EventsService) {
    super();

    this.events = this.eventsService.getEvents().shareReplay(1);
  }
}
