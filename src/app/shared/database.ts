import { SimpleMap } from './helpers/object.helpers';
import { EventLocation, EventTag, EventType } from './services/event-metadata.service';
import { StoredEventDetail } from './services/events.service';

export interface Database {
  calendar: Calendar;
}

export interface Calendar {
  events: SimpleMap<StoredEventDetail>;
  metadata: CalendarMetadata;
}

export interface CalendarMetadata {
  eventLocations: SimpleMap<EventLocation>;
  eventTags: SimpleMap<EventTag>;
  eventTypes: SimpleMap<EventType>;
}
