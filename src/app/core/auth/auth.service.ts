import { computed, inject, Injectable, signal } from '@angular/core';
import { Token } from '../models/token.model';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { API_CONFIG } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _apiConfig = inject(API_CONFIG);
  private _httpClient = inject(HttpClient);
  private _token = signal<Token | null>(null);
  public token = this._token.asReadonly();

  public isLoggedIn = computed(() => this._token());

  public login = (auth: Auth) => {
    this._httpClient
      .post<Token>(`${this._apiConfig.baseUrl}${this._apiConfig.loginEndpoint}`, auth)
      .subscribe((data) => this._token.set(data));
  };

  public logout = () => this._token.set(null);
}
