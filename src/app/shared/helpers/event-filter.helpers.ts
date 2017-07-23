import { EventDetail } from './../services/events.service';

export interface EventFilter {
  tag: string;
  type: string;
}

export const showAllEventFilter: EventFilter = { tag: '', type: '' };

export function filterEvents(events: EventDetail[], filter: EventFilter) {
  return events
    .filter(event => {
      const tagHit = filter.tag === '' || event.tags.map(tag => tag.name).includes(filter.tag);
      const typeHit = filter.type === '' || event.type.name === filter.type;

      return tagHit && typeHit;
    });
}
