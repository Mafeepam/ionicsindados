import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withPreloading,
  PreloadAllModules,
  RouteReuseStrategy,
} from '@angular/router';
import {
  IonicRouteStrategy,
  isPlatform,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { Capacitor } from '@capacitor/core';

import { routes } from './app.routes';
import { getNativeIonicConfig } from './native-config';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({
      ...getNativeIonicConfig(
        Capacitor.getPlatform(),
        typeof window === 'undefined' ? '' : window.location.search,
        typeof window !== 'undefined' && isPlatform('ios') ? 'ios' : 'md',
      ),
      // Agreement clauses are static local demo content sanitized by Ionic.
      innerHTMLTemplatesEnabled: true,
    }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
};
