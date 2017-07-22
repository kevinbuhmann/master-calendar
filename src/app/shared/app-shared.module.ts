import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { EditEventDialogComponent } from './../dialogs/edit-event-dialog/edit-event-dialog.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { InputDateTimeComponent } from './components/input-date-time/input-date-time.component';
import { InputTimeComponent } from './components/input-time/input-time.component';
import { firebaseConfig } from './firebase-config';
import { AppMaterialModule } from './modules/app-material.module';
import { EventsService } from './services/events.service';
import { FirebaseService } from './services/firebase.service';

const components = [
  ConfirmDialogComponent,
  EditEventDialogComponent,
  EventListComponent,
  InputDateTimeComponent,
  InputTimeComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  providers: [
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
    AppMaterialModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    ...components
  ],
  entryComponents: [
    ConfirmDialogComponent,
    EditEventDialogComponent
  ]
})
export class AppSharedModule { }
