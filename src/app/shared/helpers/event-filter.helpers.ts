import { EventDetail } from './../services/events.service';

export interface EventFilter {
  location: string;
  tag: string;
  type: string;
}

export const showAllEventFilter: EventFilter = { location: '', tag: '', type: '' };

export function filterEvents(events: EventDetail[], filter: EventFilter) {
  return events
    .filter(event => {
      const locationHit = filter.location === '' || event.location.address === filter.location;
      const tagHit = filter.tag === '' || event.tags.map(tag => tag.name).includes(filter.tag);
      const typeHit = filter.type === '' || event.type.name === filter.type;

      return locationHit && tagHit && typeHit;
    });
}
