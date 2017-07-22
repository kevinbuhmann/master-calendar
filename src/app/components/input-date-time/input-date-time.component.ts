import { forwardRef, Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseComponent } from './../../base.component';

@Component({
  selector: 'app-input-date-time',
  templateUrl: './input-date-time.component.html',
  styleUrls: ['./input-date-time.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateTimeComponent),
      multi: true
    }
  ]
})
export class InputDateTimeComponent extends BaseComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder = 'Date';
  @Input() timeStep = 1;

  // tslint:disable-next-line:no-input-rename
  @Input('value') _value = new Date();

  date = new Date();
  time = new Date();

  private onChange: any;

  get value() {
    return this._value;
  }

  set value(value) {
    this.date = new Date(value);
    this.time = new Date(value);
    this._value = new Date(value);
    this.onChange(this._value);
  }

  constructor() {
    super();

    this.onChange = () => { };
  }

  ngOnInit() { }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched() { }

  updateDate(date: Date) {
    if (date) {
      this.value = InputDateTimeComponent.mergeDateAndTime(date, this.value);
    }
  }

  updateTime(time: Date) {
    if (time) {
      this.value = InputDateTimeComponent.mergeDateAndTime(this.value, time);
    }
  }

  private static mergeDateAndTime(date: Date, time: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes());
  }
}
