import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { defaultSnackBarOptions, warnSnackBarOptions } from './../constants';
import { FirebaseService } from './firebase.service';

export interface CalendarEvent {
  key?: string;
  name: string;
  startDateTime: Date;
  endDateTime: Date;
  location: string;
  description: string;
}

interface StoredEvent {
  $key?: string;
  name: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  description: string;
}

@Injectable()
export class EventsService {
  constructor(public snackBarService: MdSnackBar, private firebase: FirebaseService) { }

  getEvents() {
    return this.firebase.list<StoredEvent>('events')
      .map(events => events.map(event => this.toCalendarEvent(event)))
      .map(events => events.sort((event1, event2) => event2.startDateTime.getTime() - event1.startDateTime.getTime()));
  }

  addEvent(event: CalendarEvent) {
    if (event.key) {
      throw new Error('refusing to add event that already has a key.');
    }

    return this.firebase.push('events', this.toStoredEvent(event))
      .do(() => { this.snackBarService.open('Event added!', undefined, defaultSnackBarOptions); });
  }

  updateEvent(event: CalendarEvent) {
    if (!event.key) {
      throw new Error('cannot update event with missing key.');
    }

    return this.firebase.set(`events/${event.key}`, this.toStoredEvent(event))
      .do(() => { this.snackBarService.open('Event updated!', undefined, defaultSnackBarOptions); });
  }

  deleteEvent(event: CalendarEvent) {
    if (!event.key) {
      throw new Error('cannot delete event with missing key.');
    }

    return this.firebase.delete(`events/${event.key}`)
      .do(() => { this.snackBarService.open('Event deleted!', undefined, warnSnackBarOptions); });
  }

  private toStoredEvent(event: CalendarEvent) {
    return {
      name: event.name || null,
      startDateTime: event.startDateTime ? event.startDateTime.toISOString() : null,
      endDateTime: event.endDateTime ? event.endDateTime.toISOString() : null,
      location: event.location || null,
      description: event.description || null
    } as StoredEvent;
  }

  private toCalendarEvent(event: StoredEvent) {
    return {
      key: event.$key,
      name: event.name,
      startDateTime: new Date(event.startDateTime),
      endDateTime: new Date(event.endDateTime),
      location: event.location,
      description: event.description
    } as CalendarEvent;
  }
}
