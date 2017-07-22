import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { EditEventDialogComponent } from './dialogs/edit-event-dialog/edit-event-dialog.component';
import { HomeComponent } from './pages/home/home.component';
import { AppMaterialModule } from './shared/app-material.module';
import { EventListComponent } from './shared/components/event-list/event-list.component';
import { InputDateTimeComponent } from './shared/components/input-date-time/input-date-time.component';
import { InputTimeComponent } from './shared/components/input-time/input-time.component';
import { firebaseConfig } from './shared/firebase-config';
import { EventsService } from './shared/services/events.service';
import { FirebaseService } from './shared/services/firebase.service';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    EditEventDialogComponent,
    EventListComponent,
    HomeComponent,
    InputDateTimeComponent,
    InputTimeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AppMaterialModule,
    AppRoutingModule
  ],
  providers: [
    EventsService,
    FirebaseService
  ],
  entryComponents: [
    ConfirmDialogComponent,
    EditEventDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
