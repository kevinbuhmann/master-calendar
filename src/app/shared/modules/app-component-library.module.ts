import { CdkTableModule } from '@angular/cdk';
import { NgModule } from '@angular/core';
import {
  MdAutocompleteModule,
  MdButtonModule,
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

const materialModules = [
  CdkTableModule,
  MdAutocompleteModule,
  MdButtonModule,
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
    CalendarModule.forRoot()
  ],
  exports: [
    ...materialModules,
    CalendarModule
  ]
})
export class AppComponentLibraryModule { }
