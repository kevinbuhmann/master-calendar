import * as firebase from 'firebase';
import { readFileSync, writeFileSync } from 'fs';

import { Database } from '../src/app/shared/database';
import { firebaseConfig } from './../src/app/shared/firebase-config';
import { EventTag, EventType } from './../src/app/shared/services/event-metadata.service';
import { StoredEventDetail } from './../src/app/shared/services/events.service';

interface MockData {
  buzzword: string;
  catchphrase: string;
  type: string;
  color: string;
  location: string;
}

const dateStep = 900000;
const minDate = new Date(2017, 6, 1);
const maxDate = new Date(2017, 9, 1);

const app = firebase.initializeApp(firebaseConfig);
const ref = app.database().ref();

// https://www.mockaroo.com/
const data: MockData[] = JSON.parse(readFileSync('./seed/mock-data.json').toString());

// http://www.lipsum.com/
const descriptions = readFileSync('./seed/lorem-ipsum.txt').toString()
  .split('\n')
  .map(description => description.trim())
  .filter(description => description.length > 0);

const shortDescriptions = descriptions
  .join('.')
  .split('.')
  .map(description => description.trim())
  .filter(description => description.length > 0)
  .map(description => `${description}.`);

const eventTags = data
  .slice(0, 25)
  .map(mock => makeEventTag(mock.buzzword, mock.color))
  .reduce((map, value) => { map[ref.push().key] = value; return map; }, {});

const eventTagKeys = Object.keys(eventTags);

const eventTypes = data
  .slice(0, 10)
  .map(mock => makeEventType(mock.type, mock.color))
  .reduce((map, value) => { map[ref.push().key] = value; return map; }, {});

const eventTypeKeys = Object.keys(eventTypes);

const events = data
  .map(mock => makeEvent(mock.catchphrase, mock.location))
  .reduce((map, value) => { map[ref.push().key] = value; return map; }, {});

const database: Database = {
  calendar: {
    events, metadata: {
      eventTags,
      eventTypes
    }
  }
};

writeFileSync('./seed/database.json', JSON.stringify(database, undefined, 4));

ref.set(database)
  .then(() => { app.database().goOffline(); });

function makeEventType(type: string, color: string) {
  return {
    name: type,
    color,
    description: shortDescriptions[Math.floor(Math.random() * shortDescriptions.length)]
  } as EventType;
}

function makeEventTag(buzzword: string, color: string) {
  return {
    name: buzzword,
    description: shortDescriptions[Math.floor(Math.random() * shortDescriptions.length)]
  } as EventTag;
}

function makeEvent(catchphrase: string, location: string) {
  return {
    title: catchphrase,
    location,
    ...randomDates(),
    tags: randomTags(),
    type: eventTypeKeys[Math.floor(Math.random() * eventTypeKeys.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)]
  } as StoredEventDetail;
}

function randomDates() {
  const minStep = Math.floor(minDate.getTime() / dateStep);
  const maxStep = Math.floor(maxDate.getTime() / dateStep);
  const randomStartStep = minStep + Math.floor(Math.random() * (maxStep - minStep));
  const randomEndStep = randomStartStep + 4 + Math.floor(Math.random() * 20);

  const start = new Date(randomStartStep * dateStep);
  const end = new Date(randomEndStep * dateStep);

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

function randomTags() {
  const selectedTags: string[] = [];
  const count = 1 + Math.floor(Math.random() * 4);

  for (let i = 0; i < count; i++) {
    selectedTags.push(eventTagKeys[Math.floor(Math.random() * eventTagKeys.length)]);
  }

  return selectedTags
    .filter((tag, index, self) => self.indexOf(tag) === index);
}
