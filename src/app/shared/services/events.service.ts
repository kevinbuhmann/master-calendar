import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { defaultSnackBarOptions, warnSnackBarOptions } from './../constants';
import { FirebaseService } from './firebase.service';

export interface EventDetail {
  key?: string;
  title: string;
  start: Date;
  end: Date;
  location: string;
  description: string;
}

interface StoredEventDetail {
  $key?: string;
  title: string;
  start: string;
  end: string;
  location: string;
  description: string;
}

@Injectable()
export class EventsService {
  constructor(public snackBarService: MdSnackBar, private firebase: FirebaseService) { }

  getEvents() {
    return this.firebase.list<StoredEventDetail>('events')
      .map(events => events.map(event => this.toCalendarEvent(event)))
      .map(events => events.sort((event1, event2) => event1.start.getTime() - event2.start.getTime()));
  }

  getEvent(eventKey: string) {
    return this.firebase.object<StoredEventDetail>(`events/${eventKey}`)
      .map(event => this.toCalendarEvent(event));
  }

  addEvent(event: EventDetail) {
    if (event.key) {
      throw new Error('refusing to add event that already has a key.');
    }

    return this.firebase.push('events', this.toStoredEvent(event))
      .do(() => { this.snackBarService.open('Event added!', undefined, defaultSnackBarOptions); });
  }

  updateEvent(event: EventDetail) {
    if (!event.key) {
      throw new Error('cannot update event with missing key.');
    }

    return this.firebase.set(`events/${event.key}`, this.toStoredEvent(event))
      .do(() => { this.snackBarService.open('Event updated!', undefined, defaultSnackBarOptions); });
  }

  deleteEvent(event: EventDetail) {
    if (!event.key) {
      throw new Error('cannot delete event with missing key.');
    }

    return this.firebase.delete(`events/${event.key}`)
      .do(() => { this.snackBarService.open('Event deleted!', undefined, warnSnackBarOptions); });
  }

  private toStoredEvent(event: EventDetail) {
    return {
      title: event.title || null,
      start: event.start ? event.start.toISOString() : null,
      end: event.end ? event.end.toISOString() : null,
      location: event.location || null,
      description: event.description || null
    } as StoredEventDetail;
  }

  private toCalendarEvent(event: StoredEventDetail) {
    return {
      key: event.$key,
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      location: event.location,
      description: event.description
    } as EventDetail;
  }
}
