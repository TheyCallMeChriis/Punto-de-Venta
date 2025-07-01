import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { withInterceptors, provideHttpClient } from '@angular/common/http'; 
import { jwtInterceptor } from './shared/helpers/interceptors/jwt-interceptor'; 

import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),

    
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor]))

  ]
};
