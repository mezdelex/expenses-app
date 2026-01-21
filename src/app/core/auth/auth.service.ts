import { API_CONFIG } from '../config/api.config';
import { Auth } from '../models/auth.model';
import { ErrorsService } from '../errors/errors.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { computed, effect, inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _apiConfig = inject(API_CONFIG);
  private readonly _errorsService = inject(ErrorsService);
  private readonly _httpClient = inject(HttpClient);
  private readonly _router = inject(Router);
  private readonly _user = signal<User | null>(null);

  public readonly user = this._user.asReadonly();

  public constructor() {
    effect((): void => {
      this.isLoggedIn() ? this._router.navigate(['/manager']) : this._router.navigate(['/login']);
    });
  }

  public readonly isLoggedIn = computed(() => this._user());

  public login(auth: Auth): void {
    this._httpClient
      .post(`${this._apiConfig.baseUrl}${this._apiConfig.identityLoginEndpoint}`, auth)
      .subscribe({
        next: (): void => {
          this.loadUser();
        },
        error: (err: HttpErrorResponse): void => {
          this._errorsService.errorSubject.next(err);
        },
      });
  }

  public loadUser(): void {
    this._httpClient
      .get<User>(`${this._apiConfig.baseUrl}${this._apiConfig.identityInfoEndpoint}`)
      .subscribe((user): void => {
        this._user.set(user);
      });
  }

  public logout(): void {
    this._httpClient
      .get(`${this._apiConfig.baseUrl}${this._apiConfig.applicationUsersLogoutEndpoint}`)
      .subscribe({
        next: (): void => {
          this._user.set(null);
        },
        error: (err: HttpErrorResponse): void => {
          this._errorsService.errorSubject.next(err);
        },
      });
  }
}
