import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

/**
 * Etapa 1 — Rotas da aplicação.
 *
 * /login              → tela pública de autenticação simulada (RF01)
 * /tabs/home          → área logada, protegida pelo authGuard (RF02/RF05)
 * /tabs/noticias      → lista de notícias sindicais (RF03)
 * /tabs/acordos       → lista de ACTs e CCTs (RF04)
 */
export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'tabs',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.tabsRoutes),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
