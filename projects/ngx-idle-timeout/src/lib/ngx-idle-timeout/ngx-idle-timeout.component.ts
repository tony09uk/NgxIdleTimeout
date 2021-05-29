import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Observable, of, Subscription} from 'rxjs';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { tap } from 'rxjs/internal/operators/tap';

import { IdleWarningStates } from '../enums/idle-warning.states.enum';
import { IdleService } from '../services/idle.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'ngx-idle-timeout',
  templateUrl: './ngx-idle-timeout.component.html'
})
export class NgxIdleTimeoutComponent implements OnInit, OnDestroy {

  @Input() allowedIdleTimeInSeconds = 60;
  @Input() warningTimeInSeconds = 10;
  @Input() message: string;

  modalId = 'timeout';
  isIdlePopupOpen = false;

  constructor(
    private _idleService: IdleService,
    private _modalService: ModalService) { }

  private _subscriptionsArray$: Subscription[] = [];

  ngOnInit(): void {
    this._idleService.allowedIdleTime = this.allowedIdleTimeInSeconds;
    this._idleService.idleWarningTime = this.warningTimeInSeconds;

    this.watchTimeout();
    this.watchStateChanged();
    this.watchTimerReset();
  }

  ngOnDestroy(): void {
    this._subscriptionsArray$.forEach(item => {
      item.unsubscribe();
    });
    this._idleService.stopTimer();
  }

  private watchTimeout(): void {
    const sub$ = this._idleService
                  .startWatching()
                  .pipe(
                    tap(() => this._idleService.currentIdleWarningState = IdleWarningStates.PrimaryTimerExpired)
                  )
                  .subscribe();

    this._subscriptionsArray$.push(sub$);
  }

  private watchStateChanged(): void {
    const sub$ = this._idleService
                  .idleStateChanged()
                  .pipe(
                    mergeMap((state: IdleWarningStates) => this.showTimeoutWarning(state))
                  )
                  .subscribe((data: boolean | null) => this.setState(data));

    this._subscriptionsArray$.push(sub$);
  }

  private showTimeoutWarning(state: IdleWarningStates): Observable<boolean | null> {
    if (state === IdleWarningStates.PrimaryTimerExpired && !this.isIdlePopupOpen) {
      this.isIdlePopupOpen = true;

      this._modalService.open(this.modalId);
      return this._modalService.afterClosed();
    }
    return of(null);
  }

  private setState(action: boolean | null): void {
    if (!action) {
      return;
    }

    this._idleService.currentIdleWarningState = action ?
      IdleWarningStates.PrimaryTimerStarted :
      IdleWarningStates.SecondaryTimerExpired;
  }

  private watchTimerReset(): void {
    const sub$ = this._idleService
                    .timerResetOccoured()
                    .subscribe(() => this.closeDialog());

    this._subscriptionsArray$.push(sub$);
  }

  private closeDialog(): void {
    if (!this.isIdlePopupOpen) {
      return;
    }

    this._modalService.close(this.modalId);
    this.isIdlePopupOpen = false;
  }
}
