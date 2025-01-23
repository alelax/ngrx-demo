import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLogged } from '../store/auth/auth.feature';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const isLogged = store.selectSignal(selectIsLogged);
  if (!isLogged()) router.navigateByUrl('login').then();
  return isLogged();
};
