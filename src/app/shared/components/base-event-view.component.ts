import { MdDialog } from '@angular/material';
import { BaseComponent } from './../../base.component';

import { ConfirmDialogComponent } from './../../dialogs/confirm-dialog/confirm-dialog.component';
import { EditEventDialogComponent } from './../../dialogs/edit-event-dialog/edit-event-dialog.component';
import { ViewEventDialogComponent } from './../../dialogs/view-event-dialog/view-event-dialog.component';
import { EventsService, EventDetail } from './../services/events.service';

export class BaseEventViewComponent extends BaseComponent {
  constructor(protected dialogService: MdDialog, protected eventsService: EventsService) {
    super();
  }

  viewEvent(event: EventDetail) {
    ViewEventDialogComponent.showDialog(this.dialogService, event.$key);
  }

  editEvent(event: EventDetail, $event?: Event) {
    if ($event) {
      $event.stopPropagation();
    }

    EditEventDialogComponent.showDialog(this.dialogService, event);
  }

  deleteEvent(event: EventDetail, $event?: Event) {
    if ($event) {
      $event.stopPropagation();
    }

    const dialogRef = ConfirmDialogComponent.showDialog(this.dialogService, `Are you sure you want to delete the "${event.title}" event?`);

    dialogRef.afterClosed()
      .filter(yes => yes === true)
      .switchMap(() => this.eventsService.deleteEvent(event))
      .subscribe(() => { });
  }
}
