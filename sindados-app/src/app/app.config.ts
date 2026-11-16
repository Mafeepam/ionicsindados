import { ApplicationConfig } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // innerHTMLTemplatesEnabled permite formatar a mensagem do ion-alert
    // (lista de cláusulas em RF04) com HTML simples e estático.
    provideIonicAngular({ mode: 'md', innerHTMLTemplatesEnabled: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
};
