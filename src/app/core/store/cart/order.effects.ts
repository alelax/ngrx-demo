import { createEffect } from '@ngrx/effects';
import { CartIndex } from './cart.index';

export const sendOrder = createEffect(
  () => { return CartIndex.SEND_ORDER_EXEC() },
  { functional: true }
);

export const sendOrderSuccess = createEffect(
  () => { return CartIndex.SEND_ORDER_SUCCESS_EXEC() },
  { functional: true}
);
