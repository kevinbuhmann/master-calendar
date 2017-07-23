import { Injectable } from '@angular/core';
import { CalendarMetadata } from './../database';

import { mapToArray, SimpleMap } from './../helpers/object.helpers';
import { FirebaseService } from './firebase.service';

export interface EventTag {
  $key: string;
  name: string;
  description: string;
}

export interface EventType {
  $key: string;
  name: string;
  color: string;
  description: string;
}

@Injectable()
export class EventMetadataService {
  constructor(private firebase: FirebaseService) { }

  getMetadata() {
    return this.firebase.object<CalendarMetadata>('calendar/metadata');
  }

  getEventTags() {
    return this.firebase.object<SimpleMap<EventTag>>('calendar/metadata/eventTags');
  }

  getEventTagsAsArray() {
    return this.getEventTags()
      .map(eventTypes => mapToArray(eventTypes));
  }

  getEventTag(key: string) {
    return this.firebase.object<EventTag>(`calendar/metadata/eventTags/${key}`);
  }

  getEventTypes() {
    return this.firebase.object<SimpleMap<EventType>>('calendar/metadata/eventTypes');
  }

  getEventTypesAsArray() {
    return this.getEventTypes()
      .map(eventTypes => mapToArray(eventTypes));
  }

  getEventType(key: string) {
    return this.firebase.object<EventType>(`calendar/metadata/eventTypes/${key}`);
  }
}
