import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DadosService } from '../services/dados.service';

export const authGuard: CanActivateFn = () => {
  const dados = inject(DadosService);
  const router = inject(Router);

  if (dados.isAutenticado) {
    return true;
  }

  router.navigateByUrl('/login', { replaceUrl: true });
  return false;
};
