import { CdkTableModule } from '@angular/cdk';
import { NgModule } from '@angular/core';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdCardModule,
  MdChipsModule,
  MdDatepickerModule,
  MdInputModule,
  MdNativeDateModule,
  MdSelectModule,
  MdSnackBarModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';
import { CalendarModule } from 'angular-calendar';
import { ImageUploadModule } from 'ng2-imageupload';

const materialModules = [
  CdkTableModule,
  MdAutocompleteModule,
  MdButtonModule,
  MdCardModule,
  MdChipsModule,
  MdDatepickerModule,
  MdInputModule,
  MdNativeDateModule,
  MdSelectModule,
  MdSnackBarModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule
];

@NgModule({
  imports: [
    ...materialModules,
    CalendarModule.forRoot(),
    ImageUploadModule
  ],
  exports: [
    ...materialModules,
    CalendarModule,
    ImageUploadModule
  ]
})
export class AppComponentLibraryModule { }
