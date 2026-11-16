import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { DadosService } from '../services/dados.service';

/**
 * RF05 — Controle de Acesso Básico.
 *
 * Bloqueia o acesso direto (digitando a URL, por exemplo) às telas internas
 * enquanto a flag `isAutenticado` for falsa e devolve o usuário ao login.
 */
export const authGuard: CanActivateFn = (_route, state) => {
  const dados = inject(DadosService);
  const router = inject(Router);

  if (dados.isAutenticado) {
    return true;
  }

  // Initial navigation has not committed its query parameters to the router yet.
  const queryParams = router.parseUrl(state.url).queryParams;
  return new RedirectCommand(
    router.createUrlTree(['/login'], { queryParams }),
    { replaceUrl: true },
  );
};
