import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

/**
 * RF02 — Rotas filhas da área logada, organizadas dentro das abas (ion-tabs).
 */
export const tabsRoutes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'noticias',
        loadComponent: () =>
          import('../noticias/noticias.page').then((m) => m.NoticiasPage),
      },
      {
        path: 'acordos',
        loadComponent: () =>
          import('../acordos/acordos.page').then((m) => m.AcordosPage),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
