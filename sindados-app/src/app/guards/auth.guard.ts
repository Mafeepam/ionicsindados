import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DadosService } from '../services/dados.service';

/**
 * RF05 — Controle de Acesso Básico.
 *
 * Bloqueia o acesso direto (digitando a URL, por exemplo) às telas internas
 * enquanto a flag `isAutenticado` for falsa e devolve o usuário ao login.
 */
export const authGuard: CanActivateFn = () => {
  const dados = inject(DadosService);
  const router = inject(Router);

  if (dados.isAutenticado) {
    return true;
  }

  router.navigateByUrl('/login', { replaceUrl: true });
  return false;
};
