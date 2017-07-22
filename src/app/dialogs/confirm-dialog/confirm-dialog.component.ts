import { Component } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { BaseComponent } from './../../base.component';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent extends BaseComponent {
  message: string;

  constructor(private dialogRef: MdDialogRef<ConfirmDialogComponent>) {
    super();
  }

  static showDialog(dialogService: MdDialog, message?: string) {
    const dialogOptions: MdDialogConfig = {
      width: '500px',
      panelClass: 'warn-dialog',
      position: { top: '100px' }
    };

    const dialogRef = dialogService.open(ConfirmDialogComponent, dialogOptions);

    if (message) {
      dialogRef.componentInstance.message = message;
    }

    return dialogRef;
  }

  yes() {
    this.dialogRef.close(true);
  }

  no() {
    this.dialogRef.close(false);
  }
}
