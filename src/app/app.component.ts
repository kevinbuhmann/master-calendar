import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { EditEventDialogComponent } from './dialogs/edit-event-dialog/edit-event-dialog.component';

import { BaseComponent } from './base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends BaseComponent {
  constructor(private dialogService: MdDialog) {
    super();
  }

  addEvent() {
    EditEventDialogComponent.showDialog(this.dialogService);
  }
}
