import { AuthService } from './auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const alreadyLoggedInGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return router.navigate(['/expenses']);
  }

  return true;
};
