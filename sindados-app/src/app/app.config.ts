import { ApplicationConfig } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Sem a opção `mode`, o Ionic detecta a plataforma automaticamente e
    // aplica o visual nativo correspondente: iOS no iPhone/iPad e Material
    // Design no Android. Para forçar um dos dois durante a demonstração,
    // acrescente ?ionic:mode=ios ou ?ionic:mode=md na URL.
    //
    // innerHTMLTemplatesEnabled permite formatar a mensagem do ion-alert
    // (lista de cláusulas em RF04) com HTML simples e estático.
    provideIonicAngular({ innerHTMLTemplatesEnabled: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
};
