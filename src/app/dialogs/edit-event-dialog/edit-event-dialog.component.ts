import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import * as addHours from 'date-fns/add_hours';
import { Observable } from 'rxjs/Observable';

import { BaseComponent } from './../../base.component';
import { EventLocation, EventMetadataService, EventType } from './../../shared/services/event-metadata.service';
import { EventsService, EventDetail } from './../../shared/services/events.service';

const controls = {
  title: 'title',
  start: 'start',
  end: 'end',
  eventLocationAddress: 'eventLocationAddress',
  eventTypeName: 'eventTypeName',
  imageUrl: 'imageUrl',
  description: 'description'
};

@Component({
  selector: 'app-edit-event-dialog',
  templateUrl: './edit-event-dialog.component.html',
  styleUrls: ['./edit-event-dialog.component.scss']
})
export class EditEventDialogComponent extends BaseComponent {
  originalEvent: EventDetail;

  readonly form: FormGroup;
  readonly controls = controls;
  readonly eventTypes: Observable<EventType[]>;
  readonly eventLocations: Observable<EventLocation[]>;

  constructor (
    private formBuilder: FormBuilder,
    private dialogRef: MdDialogRef<EditEventDialogComponent>,
    private eventsService: EventsService,
    private eventMetadataService: EventMetadataService
  ) {
    super();

    this.eventTypes = this.eventMetadataService.getEventTypesAsArray().shareReplay();
    this.eventLocations = this.eventMetadataService.getEventLocationsAsArray().shareReplay();

    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours());
    const end = addHours(start, 1);

    this.form = this.formBuilder.group({
      [controls.title]: ['', [Validators.required]],
      [controls.start]: [null, [Validators.required]],
      [controls.end]: [null, [Validators.required]],
      [controls.eventLocationAddress]: ['', [Validators.required]],
      [controls.eventTypeName]: [null, [Validators.required]],
      [controls.imageUrl]: [null],
      [controls.description]: ['', [Validators.required]]
    });

    this.form.controls[controls.start].setValue(start);
    this.form.controls[controls.end].setValue(end);
  }

  static showDialog(dialogService: MdDialog, event?: EventDetail) {
    const dialogOptions: MdDialogConfig = {
      width: '800px',
      position: { top: '50px' },
      panelClass: 'no-padding-dialog'
    };

    const dialogRef = dialogService.open(EditEventDialogComponent, dialogOptions);

    if (event) {
      dialogRef.componentInstance.setEvent(event);
    }

    return dialogRef;
  }

  submit() {
    const locationAddress = this.form.controls[controls.eventLocationAddress].value as string;
    const eventTypeName = this.form.controls[controls.eventTypeName].value as string;

    Observable.forkJoin(this.eventTypes.first(), this.eventLocations.first())
      .map(([eventTypes, locations]) => ({
        ...(this.originalEvent || { }),
        title: this.form.controls[controls.title].value as string,
        start: this.form.controls[controls.start].value as Date,
        end: this.form.controls[controls.end].value as Date,
        description: this.form.controls[controls.description].value as string,
        imageUrl: this.form.controls[controls.imageUrl].value as string,
        location: locations.find(location => location.address === locationAddress),
        type: eventTypes.find(eventType => eventType.name === eventTypeName)
      } as EventDetail))
      .switchMap(event => (this.originalEvent ? this.eventsService.updateEvent(event) : this.eventsService.addEvent(event)).mapTo(event))
      .subscribe(event => { this.dialogRef.close(event); });
  }

  close() {
    this.dialogRef.close();
  }

  setEvent(event: EventDetail) {
    this.originalEvent = event;

    this.form.controls[controls.title].setValue(event.title);
    this.form.controls[controls.start].setValue(event.start);
    this.form.controls[controls.end].setValue(event.end);
    this.form.controls[controls.eventLocationAddress].setValue(event.location.address);
    this.form.controls[controls.eventTypeName].setValue(event.type.name);
    this.form.controls[controls.imageUrl].setValue(event.imageUrl);
    this.form.controls[controls.description].setValue(event.description);
  }
}
