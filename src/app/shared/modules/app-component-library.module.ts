import { CdkTableModule } from '@angular/cdk';
import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdDatepickerModule,
  MdInputModule,
  MdNativeDateModule,
  MdSelectModule,
  MdSnackBarModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule
} from '@angular/material';
import { CalendarModule } from 'angular-calendar';

const materialModules = [
  CdkTableModule,
  MdButtonModule,
  MdDatepickerModule,
  MdInputModule,
  MdNativeDateModule,
  MdSelectModule,
  MdSnackBarModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule
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
