import { ApplicationConfig, importProvidersFrom, Provider, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthInterceptorService } from './services/auth-interceptor.service';

import { routes } from './app.routes';

export const HttpInterceptorProvider: Provider =
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withFetch()), importProvidersFrom(HttpClientModule), HttpInterceptorProvider, provideAnimations()]
};
