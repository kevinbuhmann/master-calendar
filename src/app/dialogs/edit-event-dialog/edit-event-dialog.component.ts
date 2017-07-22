import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import * as addHours from 'date-fns/add_hours';
import { BaseComponent } from './../../base.component';

import { CalendarEvent, EventsService } from './../../shared/services/events.service';

const controls = {
  name: 'name',
  startDateTime: 'startDateTime',
  endDateTime: 'endDateTime',
  location: 'location',
  description: 'description'
};


@Component({
  selector: 'app-edit-event-dialog',
  templateUrl: './edit-event-dialog.component.html',
  styleUrls: ['./edit-event-dialog.component.scss']
})
export class EditEventDialogComponent extends BaseComponent {
  eventKey: string;

  readonly form: FormGroup;
  readonly controls = controls;

  constructor (
    private formBuilder: FormBuilder,
    private dialogRef: MdDialogRef<EditEventDialogComponent>,
    private eventsService: EventsService
  ) {
    super();

    this.form = this.formBuilder.group({
      [controls.name]: ['', [Validators.required]],
      [controls.startDateTime]: [new Date(), [Validators.required]],
      [controls.endDateTime]: [addHours(new Date(), 1), [Validators.required]],
      [controls.location]: ['', [Validators.required]],
      [controls.description]: ['', [Validators.required]]
    });
  }

  static showDialog(dialogService: MdDialog, event?: CalendarEvent) {
    const dialogOptions: MdDialogConfig = {
      width: '500px',
      position: { top: '100px' }
    };

    const dialogRef = dialogService.open(EditEventDialogComponent, dialogOptions);

    if (event) {
      dialogRef.componentInstance.setEvent(event);
    }

    return dialogRef;
  }

  submit() {
    const event: CalendarEvent = {
      key: this.eventKey,
      name: this.form.controls[controls.name].value as string,
      startDateTime: this.form.controls[controls.startDateTime].value as Date,
      endDateTime: this.form.controls[controls.endDateTime].value as Date,
      location: this.form.controls[controls.location].value as string,
      description: this.form.controls[controls.description].value as string
    };

    const update = this.eventKey ? this.eventsService.updateEvent(event) : this.eventsService.addEvent(event);

    update
      .subscribe(() => { this.dialogRef.close(event); });
  }

  close() {
    this.dialogRef.close();
  }

  setEvent(event: CalendarEvent) {
    this.eventKey = event.key;

    this.form.controls[controls.name].setValue(event.name);
    this.form.controls[controls.startDateTime].setValue(event.startDateTime);
    this.form.controls[controls.endDateTime].setValue(event.endDateTime);
    this.form.controls[controls.location].setValue(event.location);
    this.form.controls[controls.description].setValue(event.description);
  }
}
