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

const modules = [
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
  imports: [...modules],
  exports: [...modules],
})
export class AppMaterialModule { }
