import { DataSource } from '@angular/cdk';
import { Component, Input } from '@angular/core';
import { MdDialog } from '@angular/material';

import { BaseEventViewComponent } from '../base-event-view.component';
import { EventsService, EventDetail } from './../../services/events.service';

@Component({
  selector: 'app-event-details-view',
  templateUrl: './event-details-view.component.html',
  styleUrls: ['./event-details-view.component.scss']
})
export class EventDetailsViewComponent extends BaseEventViewComponent {
  @Input() events: EventDetail[];

  eventsDataSource: DataSource<EventDetail>;

  constructor(dialogService: MdDialog, eventsService: EventsService) {
    super(dialogService, eventsService);

    this.eventsDataSource = {
      connect: () => this.getChanges(() => this.events),
      disconnect: () => { }
    };
  }
}
