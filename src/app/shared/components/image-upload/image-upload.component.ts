import { forwardRef, Component, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ImageResult, ImageUploadDirective, ResizeOptions } from 'ng2-imageupload';

import { BaseComponent } from './../../../base.component';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true
    }
  ]
})
export class ImageUploadComponent extends BaseComponent implements ControlValueAccessor {
  @Input() label = '';

  // tslint:disable-next-line:no-input-rename
  @Input('value') _value = '';

  @ViewChild(ImageUploadDirective) private readonly imageUploadDirective: any;

  readonly resizeOptions: ResizeOptions = {
    resizeMaxWidth: 500,
    resizeMaxHeight: 500
  };

  private onChange: any;

  get value() {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.onChange(this._value);
  }

  constructor() {
    super();

    this.onChange = () => { };
  }

  writeValue(value: string) {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched() { }

  selectImage() {
    this.imageUploadDirective._elementref.nativeElement.click();
  }

  removeImage() {
    this.value = undefined;
  }

  imageSelect(image: ImageResult) {
    this.value = (image.resized && image.resized.dataURL) || image.dataURL;
  }
}
