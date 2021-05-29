import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { merge } from 'rxjs/internal/observable/merge';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private modals: any[] = [];

    add(modal: any): void {
        this.modals.push(modal);
    }

    remove(id: string): void {
        this.modals = this.modals.filter(x => x.id !== id);
    }

    open(id: string): void {
        const modal = this.modals.find(x => x.id === id);
        modal.open();
    }

    close(id: string): void {
        const modal = this.modals.find(x => x.id === id);
        modal.close();
    }

    afterClosed(): Observable<any> {
        const closedModals = merge(this.modals.filter(x => x.afterClosed));
        return closedModals;
    }
}
