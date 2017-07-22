import { DataSource } from '@angular/cdk';
import { Component, Input } from '@angular/core';
import { MdDialog } from '@angular/material';

import { BaseComponent } from './../../../base.component';
import { ConfirmDialogComponent } from './../../../dialogs/confirm-dialog/confirm-dialog.component';
import { EditEventDialogComponent } from './../../../dialogs/edit-event-dialog/edit-event-dialog.component';
import { CalendarEvent, EventsService } from './../../services/events.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent extends BaseComponent {
  @Input() events: CalendarEvent[];

  eventsDataSource: DataSource<CalendarEvent>;

  constructor(private dialogService: MdDialog, private eventsService: EventsService) {
    super();

    this.eventsDataSource = {
      connect: () => this.getChanges(() => this.events),
      disconnect: () => { }
    };
  }

  editEvent(event: CalendarEvent) {
    EditEventDialogComponent.showDialog(this.dialogService, event);
  }

  deleteEvent(event: CalendarEvent) {
    const dialogRef = ConfirmDialogComponent.showDialog(this.dialogService, `Are you sure you want to delete the ${event.name} event?`);

    dialogRef.afterClosed()
      .filter(yes => yes === true)
      .switchMap(() => this.eventsService.deleteEvent(event))
      .subscribe(() => { })
    ;
  }
}
