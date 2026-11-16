import { ApplicationConfig } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
 
    provideIonicAngular({ mode: 'md', innerHTMLTemplatesEnabled: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
};
