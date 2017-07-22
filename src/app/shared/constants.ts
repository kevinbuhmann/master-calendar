import { MdSnackBarConfig } from '@angular/material';

export const defaultSnackBarOptions: MdSnackBarConfig = {
  duration: 1000
};

export const warnSnackBarOptions: MdSnackBarConfig = {
  ...defaultSnackBarOptions,
  extraClasses: ['warn-snack-bar']
};
