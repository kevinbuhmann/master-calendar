import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { defaultSnackBarOptions, warnSnackBarOptions } from './../constants';
import { Calendar, CalendarMetadata } from './../database';
import { mapToArray } from './../helpers/object.helpers';
import { EventLocation, EventMetadataService, EventTag, EventType } from './event-metadata.service';
import { StoredEventDetail } from './events.service';
import { FirebaseService } from './firebase.service';

export interface EventDetail {
  $key?: string;
  title: string;
  start: Date;
  end: Date;
  imageUrl: string;
  description: string;
  location: EventLocation;
  tags?: EventTag[];
  type?: EventType;
}

export interface StoredEventDetail {
  $key?: string;
  title: string;
  start: string;
  end: string;
  imageUrl: string;
  description: string;
  locationKey: string;
  typeKey: string;
  tagKeys: string[];
}

@Injectable()
export class EventsService {
  constructor(public snackBarService: MdSnackBar, private firebase: FirebaseService, private eventMetadataService: EventMetadataService) { }

  getEvents() {
    return this.firebase.object<Calendar>('calendar')
      .map(calendar => mapToArray(calendar.events || {}).map(event => this.toEventDetail(event, calendar.metadata)))
      .map(events => events.sort((event1, event2) => event1.start.getTime() - event2.start.getTime()));
  }

  getEvent(key: string) {
    const getEvent = this.firebase.object<StoredEventDetail>(`calendar/events/${key}`).shareReplay(1);
    const getMetadata = this.eventMetadataService.getMetadata().shareReplay(1);

    return Observable.combineLatest(getEvent, getMetadata)
      .map(([event, metadata]) => this.toEventDetail(event, metadata));
  }

  addEvent(event: EventDetail) {
    if (event.$key) {
      throw new Error('refusing to add event that already has a key.');
    }

    return this.firebase.push('calendar/events', this.toStoredEvent(event))
      .do(() => { this.snackBarService.open('Event added!', undefined, defaultSnackBarOptions); });
  }

  updateEvent(event: EventDetail) {
    if (!event.$key) {
      throw new Error('cannot update event with missing key.');
    }

    return this.firebase.set(`calendar/events/${event.$key}`, this.toStoredEvent(event))
      .do(() => { this.snackBarService.open('Event updated!', undefined, defaultSnackBarOptions); });
  }

  deleteEvent(event: EventDetail) {
    if (!event.$key) {
      throw new Error('cannot delete event with missing key.');
    }

    return this.firebase.delete(`calendar/events/${event.$key}`)
      .do(() => { this.snackBarService.open('Event deleted!', undefined, warnSnackBarOptions); });
  }

  private toStoredEvent(event: EventDetail) {
    return {
      title: event.title || null,
      start: event.start ? event.start.toISOString() : null,
      end: event.end ? event.end.toISOString() : null,
      imageUrl: event.imageUrl || null,
      description: event.description || null,
      locationKey: event.location ? event.location.$key || null : null,
      typeKey: event.type ? event.type.$key || null : null,
      tagKeys: event.tags ? event.tags.map(tag => tag.$key || null) : null
    } as StoredEventDetail;
  }

  private toEventDetail(event: StoredEventDetail, metadata: CalendarMetadata) {
    return {
      $key: event.$key,
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      imageUrl: event.imageUrl,
      description: event.description,
      location: { $key: event.locationKey, ...metadata.eventLocations[event.locationKey] },
      type: { $key: event.typeKey, ...metadata.eventTypes[event.typeKey] },
      tags: (event.tagKeys || []).map(tagKey => ({ $key: tagKey, ...metadata.eventTags[tagKey] }))
    } as EventDetail;
  }
}
