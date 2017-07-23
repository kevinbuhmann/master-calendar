import { Component, Inject } from '@angular/core';
import { MdDialog, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';
import * as isSameDay from 'date-fns/is_same_day';
import { Observable } from 'rxjs/Observable';

import { BaseComponent } from './../../base.component';
import { EventsService, EventDetail } from './../../shared/services/events.service';

@Component({
  selector: 'app-view-event-dialog',
  templateUrl: './view-event-dialog.component.html',
  styleUrls: ['./view-event-dialog.component.scss']
})
export class ViewEventDialogComponent extends BaseComponent {
  event: Observable<EventDetail>;
  endFormat: Observable<string>;

  constructor(
    @Inject(MD_DIALOG_DATA) private eventKey: string,
    private eventsService: EventsService
  ) {
    super();

    this.event = this.eventsService.getEvent(this.eventKey);
    this.endFormat = this.event.map(event => isSameDay(event.start, event.end) ? 'h:mm a' : 'MMM d, y h:mm a');
  }

  static showDialog(dialogService: MdDialog, eventKey: string) {
    const dialogOptions: MdDialogConfig = {
      data: eventKey,
      width: '500px',
      position: { top: '100px' }
    };

    const dialogRef = dialogService.open(ViewEventDialogComponent, dialogOptions);

    if (eventKey) {
      dialogRef.componentInstance.eventKey = eventKey;
    }

    return dialogRef;
  }

}
