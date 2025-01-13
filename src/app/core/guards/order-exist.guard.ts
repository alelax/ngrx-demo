import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsCartEmpty } from '../store/cart/cart.feature';

export const orderExistGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const isCartEmpty = store.selectSignal(selectIsCartEmpty);
  if (isCartEmpty()) router.navigateByUrl('shop').then();
  return !isCartEmpty();
};
