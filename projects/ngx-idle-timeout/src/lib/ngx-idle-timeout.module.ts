import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IdleWarningComponent } from './idle-warning/idle-warning.component';
import { ModalComponent } from './modal/modal.component';
import { NgxIdleTimeoutComponent } from './ngx-idle-timeout/ngx-idle-timeout.component';

@NgModule({
  declarations: [
    IdleWarningComponent,
    ModalComponent,
    NgxIdleTimeoutComponent],
  imports: [
    CommonModule
  ],
  exports: [
    NgxIdleTimeoutComponent
  ]
})
export class NgxIdleTimeoutModule { }
