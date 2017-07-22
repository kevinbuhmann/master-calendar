import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventDialogComponent } from './view-event-dialog.component';

describe('ViewEventDialogComponent', () => {
  let component: ViewEventDialogComponent;
  let fixture: ComponentFixture<ViewEventDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEventDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
