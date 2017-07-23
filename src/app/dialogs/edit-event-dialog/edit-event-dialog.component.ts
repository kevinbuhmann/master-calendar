import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import * as addHours from 'date-fns/add_hours';
import { BaseComponent } from './../../base.component';

import { EventsService, EventDetail } from './../../shared/services/events.service';

const controls = {
  title: 'title',
  start: 'start',
  end: 'end',
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
      [controls.title]: ['', [Validators.required]],
      [controls.start]: [new Date(), [Validators.required]],
      [controls.end]: [addHours(new Date(), 1), [Validators.required]],
      [controls.location]: ['', [Validators.required]],
      [controls.description]: ['', [Validators.required]]
    });
  }

  static showDialog(dialogService: MdDialog, event?: EventDetail) {
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
    const event: EventDetail = {
      key: this.eventKey,
      title: this.form.controls[controls.title].value as string,
      start: this.form.controls[controls.start].value as Date,
      end: this.form.controls[controls.end].value as Date,
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

  setEvent(event: EventDetail) {
    this.eventKey = event.key;

    this.form.controls[controls.title].setValue(event.title);
    this.form.controls[controls.start].setValue(event.start);
    this.form.controls[controls.end].setValue(event.end);
    this.form.controls[controls.location].setValue(event.location);
    this.form.controls[controls.description].setValue(event.description);
  }
}
