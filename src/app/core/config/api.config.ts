import { InjectionToken, Provider } from '@angular/core';
import { ApiConfig } from '../models/api-config.model';
import { environment } from '../../../environments/environment';

export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');

export function provideApiConfig(): Provider {
  return {
    provide: API_CONFIG,
    useValue: environment,
  };
}
