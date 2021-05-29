import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'ng-idle-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

    @Input() id: string;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    private _closed$: Subject<boolean> = new Subject<boolean>();
    private element: any;

    ngOnInit(): void {
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        this.toggleVisibility();

        document.body.appendChild(this.element);

        this.modalService.add(this);
    }

    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    open(): void {
        this.toggleVisibility();
    }

    close(): void {
        this.toggleVisibility();
        this._closed$.next(true);
    }

    afterClosed(): Observable<boolean> {
      return this._closed$;
    }

    private toggleVisibility(): void {
      if (this.element.style.visibility === 'hidden') {
        this.element.style.visibility = 'visible';
        this.element.style.opacity = 1;
      } else {
        this.element.style.visibility = 'hidden';
        this.element.style.opacity = 0;
      }
    }
}
