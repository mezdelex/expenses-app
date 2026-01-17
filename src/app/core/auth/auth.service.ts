import { API_CONFIG } from '../config/api.config';
import { Auth } from '../models/auth.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../notifications/notifications.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { computed, effect, inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _apiConfig = inject(API_CONFIG);
  private _httpClient = inject(HttpClient);
  private _notificationService = inject(NotificationService);
  private _router = inject(Router);
  private _user = signal<User | null>(null);

  public user = this._user.asReadonly();

  public constructor() {
    effect((): void => {
      this.isLoggedIn() ? this._router.navigate(['/expenses']) : this._router.navigate(['/login']);
    });
  }

  public isLoggedIn = computed(() => this._user());

  public login = (auth: Auth): void => {
    this._httpClient
      .post(`${this._apiConfig.baseUrl}${this._apiConfig.identityLoginEndpoint}`, auth)
      .subscribe({
        next: () => this.loadUser(),
        error: (err: HttpErrorResponse) =>
          this._notificationService.showError(err.error?.message || err.message),
      });
  };

  public loadUser = (): void => {
    this._httpClient
      .get<User>(`${this._apiConfig.baseUrl}${this._apiConfig.identityInfoEndpoint}`)
      .subscribe((user) => this._user.set(user));
  };

  public logout = (): void => {
    this._httpClient
      .get(`${this._apiConfig.baseUrl}${this._apiConfig.applicationUsersLogoutEndpoint}`)
      .subscribe({
        next: () => this._user.set(null),
        error: (err: HttpErrorResponse) => {
          this._notificationService.showError(err.error?.message || err.message);
        },
      });
  };
}
