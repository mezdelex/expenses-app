import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../notifications/notifications.service';
import { Subject } from 'rxjs';
import { effect, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ErrorsService {
  private readonly _notificationsService = inject(NotificationService);

  public readonly errorSubject = new Subject<HttpErrorResponse>();

  public constructor() {
    const globalError = toSignal(this.errorSubject);

    effect(() => {
      const error = globalError();
      if (error) {
        this._notificationsService.showError(error.error?.message || error.message);
      }
    });
  }
}
