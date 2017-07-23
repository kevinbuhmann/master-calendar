import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { EditEventDialogComponent } from './../dialogs/edit-event-dialog/edit-event-dialog.component';
import { ViewEventDialogComponent } from './../dialogs/view-event-dialog/view-event-dialog.component';
import { EventCalendarViewComponent } from './components/event-calendar-view/event-calendar-view.component';
import { EventDetailsViewComponent } from './components/event-details-view/event-details-view.component';
import { EventFilterComponent } from './components/event-filter/event-filter.component';
import { InputDateTimeComponent } from './components/input-date-time/input-date-time.component';
import { InputTimeComponent } from './components/input-time/input-time.component';
import { firebaseConfig } from './firebase-config';
import { AppComponentLibraryModule } from './modules/app-component-library.module';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { EventMetadataService } from './services/event-metadata.service';
import { EventsService } from './services/events.service';
import { FirebaseService } from './services/firebase.service';

const components = [
  ConfirmDialogComponent,
  EditEventDialogComponent,
  EventCalendarViewComponent,
  EventDetailsViewComponent,
  EventFilterComponent,
  EventFilterComponent,
  InputDateTimeComponent,
  InputTimeComponent,
  ViewEventDialogComponent
];

const pipes = [
  MarkdownPipe
];

@NgModule({
  declarations: [
    ...components,
    ...pipes
  ],
  providers: [
    EventMetadataService,
    EventsService,
    FirebaseService
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AppComponentLibraryModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppComponentLibraryModule,
    ...components,
    ...pipes
  ],
  entryComponents: [
    ConfirmDialogComponent,
    EditEventDialogComponent,
    ViewEventDialogComponent
  ]
})
export class AppSharedModule { }
