import { Component, Input } from '@angular/core';
import { MdDialog } from '@angular/material';

import { ViewEventDialogComponent } from './../../../dialogs/view-event-dialog/view-event-dialog.component';
import { EventsService, EventDetail } from './../../services/events.service';
import { BaseEventViewComponent } from './../base-event-view.component';

@Component({
  selector: 'app-event-agenda-view',
  templateUrl: './event-agenda-view.component.html',
  styleUrls: ['./event-agenda-view.component.scss']
})
export class EventAgendaViewComponent extends BaseEventViewComponent {
  @Input() events: EventDetail[];

  constructor(dialogService: MdDialog, eventsService: EventsService) {
    super(dialogService, eventsService);
  }

  getEndFormat(event: EventDetail) {
    return ViewEventDialogComponent.getEndFormat(event);
  }
}
