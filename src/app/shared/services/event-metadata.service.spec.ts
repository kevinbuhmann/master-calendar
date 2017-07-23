import { inject, TestBed } from '@angular/core/testing';

import { EventMetadataService } from './event-metadata.service';

describe('EventMetadataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventMetadataService]
    });
  });

  it('should be created', inject([EventMetadataService], (service: EventMetadataService) => {
    expect(service).toBeTruthy();
  }));
});
