import { API_CONFIG } from '../config/api.config';
import { Auth } from '../models/auth.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../notifications/notifications.service';
import { Router } from '@angular/router';
import { Token } from '../models/token.model';
import { catchError, throwError } from 'rxjs';
import { computed, effect, inject, Injectable, Injector, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _apiConfig = inject(API_CONFIG);
  private _httpClient = inject(HttpClient);
  private _injector = inject(Injector);
  private _notificationService = inject(NotificationService);
  private _router = inject(Router);
  private _token = signal<Token | null>(null);

  public token = this._token.asReadonly();

  public constructor() {
    effect(
      () =>
        this.isLoggedIn()
          ? this._router.navigate(['/expenses'])
          : this._router.navigate(['/login']),
      { injector: this._injector },
    );
  }

  public isLoggedIn = computed(() => this._token());

  public login = (auth: Auth): void => {
    this._httpClient
      .post<Token>(`${this._apiConfig.baseUrl}${this._apiConfig.loginEndpoint}`, auth)
      .pipe(catchError((err: HttpErrorResponse) => throwError(() => err)))
      .subscribe({
        next: (token: Token) => this._token.set(token),
        error: (err: HttpErrorResponse) =>
          this._notificationService.showError(err.error?.message || err.message),
      });
  };

  public logout = (): void => this._token.set(null);
}
