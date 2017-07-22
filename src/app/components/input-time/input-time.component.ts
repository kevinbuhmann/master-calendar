import { forwardRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseComponent } from './../../base.component';

@Component({
  selector: 'app-input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTimeComponent),
      multi: true
    }
  ]
})
export class InputTimeComponent extends BaseComponent implements OnInit, ControlValueAccessor {
  hours = [];
  minutes = [];

  @Input() step = 1;
  @Output() change = new EventEmitter<Date>();

  // tslint:disable-next-line:no-input-rename
  @Input('value') _value = new Date();

  private onChange: any;

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = new Date(value);
    this.onChange(this._value);
    this.change.next(this.value);
  }

  constructor() {
    super();

    this.onChange = () => { };
  }

  ngOnInit() {
    for (let i = 1; i <= 12; i++) {
      this.hours.push({ value: i.toString(), label: i.toString() });
    }

    for (let i = 0; i <= 60; i++) {
      let label = '';
      if (i.toString().length < 2) {
        label = '0' + i;
      } else {
        label = i.toString();
      }

      if (i % this.step === 0 && i !== 60) {
        this.minutes.push({ value: i.toString(), label });
      }
    }
  }

  writeValue(value: any) {
    if (value) {
      const date = new Date(value);
      const mins = this.minutes.find(m => +m.val === date.getMinutes());
      date.setMinutes(mins ? +mins.val : 0);
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched() { }

  updateHour(event) {
    const date = new Date(this.value);
    const currentHour = date.getHours();
    const am = currentHour < 13;

    if (am) {
      date.setHours(parseInt(event.value, 10));
    } else {
      date.setHours(parseInt(event.value, 10) + 12);
    }

    this.value = date;
  }

  updateMinute(event) {
    const date = new Date(this.value);
    date.setMinutes(parseInt(event.value, 10));
    this.value  = date;
  }

  updatePeriod(event) {
    const date = new Date(this.value);
    const currentHour = date.getHours();

    if (currentHour < 12 && event.value === 'pm') {
      date.setHours(currentHour + 12);
    } else if (currentHour > 12 && event.value === 'am') {
      date.setHours(currentHour - 12);
    } else if (currentHour === 12) {
      const cur = event.value === 'am' ? 0 : 24;
      date.setHours(cur);
    }

    this.value  = date;
  }

  activeHour() {
    let hour = this.value.getHours();

    if (hour > 12) {
      hour -= 12;
    } else if (hour === 0) {
      hour = 12;
    }

    return hour.toString();
  }

  activeMinute() {
    return this.value.getMinutes().toString();
  }

  activePeriod() {
    return this.value.getHours() >= 12 ? 'pm' : 'am';
  }
}
