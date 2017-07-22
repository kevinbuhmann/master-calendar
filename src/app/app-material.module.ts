import { NgModule } from '@angular/core';
import { MdToolbarModule } from '@angular/material';

const modules = [
  MdToolbarModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class AppMaterialModule { }
