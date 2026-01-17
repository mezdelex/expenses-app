import { InjectionToken, Provider } from '@angular/core';
import { ApiConfig } from '../models/api-config.model';
import { environment } from '../../../environments/environment';

export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');

export const provideApiConfig = (): Provider => ({ provide: API_CONFIG, useValue: environment });
