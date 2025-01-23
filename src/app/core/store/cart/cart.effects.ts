import { createEffect } from '@ngrx/effects';
import { CartIndex } from './cart.index';

export const saveCartInLocalStorage = createEffect(
  () => { return CartIndex.SAVE_CART_IN_LOCAL_STORAGE_EXEC() },
  { functional: true, dispatch: false }
);

export const loadCartFromLocalStorage = createEffect(
  () => { return CartIndex.LOAD_CART_FROM_LOCAL_STORAGE_EXEC() },
  { functional: true }
);

export const clearCartLocalStorage = createEffect(
  () => { return CartIndex.CLEAR_CART_LOCAL_STORAGE_EXEC() },
  { functional: true, dispatch: false}
);
