import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideApiConfig } from './core/config/api.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideApiConfig(),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
  ],
};
