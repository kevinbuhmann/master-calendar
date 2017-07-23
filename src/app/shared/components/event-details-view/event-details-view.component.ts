import { DataSource } from '@angular/cdk';
import { Component, Input } from '@angular/core';
import { MdDialog } from '@angular/material';

import { BaseComponent } from './../../../base.component';
import { ConfirmDialogComponent } from './../../../dialogs/confirm-dialog/confirm-dialog.component';
import { EditEventDialogComponent } from './../../../dialogs/edit-event-dialog/edit-event-dialog.component';
import { ViewEventDialogComponent } from './../../../dialogs/view-event-dialog/view-event-dialog.component';
import { EventsService, EventDetail } from './../../services/events.service';

@Component({
  selector: 'app-event-details-view',
  templateUrl: './event-details-view.component.html',
  styleUrls: ['./event-details-view.component.scss']
})
export class EventDetailsViewComponent extends BaseComponent {
  @Input() events: EventDetail[];

  eventsDataSource: DataSource<EventDetail>;

  constructor(private dialogService: MdDialog, private eventsService: EventsService) {
    super();

    this.eventsDataSource = {
      connect: () => this.getChanges(() => this.events),
      disconnect: () => { }
    };
  }

  viewEvent(event: EventDetail) {
    ViewEventDialogComponent.showDialog(this.dialogService, event.key);
  }

  editEvent($event: Event, event: EventDetail) {
    $event.stopPropagation();
    EditEventDialogComponent.showDialog(this.dialogService, event);
  }

  deleteEvent($event: Event, event: EventDetail) {
    $event.stopPropagation();
    const dialogRef = ConfirmDialogComponent.showDialog(this.dialogService, `Are you sure you want to delete the ${event.title} event?`);

    dialogRef.afterClosed()
      .filter(yes => yes === true)
      .switchMap(() => this.eventsService.deleteEvent(event))
      .subscribe(() => { })
    ;
  }
}
