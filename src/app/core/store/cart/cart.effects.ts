import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartActions } from './cart.actions';
import { tap } from 'rxjs';
import { selectList } from './cart.feature';
import { LocalStorageDictionary } from '../../dictionaries/localStorageDictionary';

export const saveCartInLocalStorage = createEffect(() => {
  const store = inject(Store);
  const actions$ = inject(Actions);
  return actions$.pipe(
    ofType(
      CartActions.add,
      CartActions.remove,
      CartActions.clear,
      CartActions.increaseQuantity,
      CartActions.decreaseQuantity
    ),
    tap(() => {
      const cartList = store.selectSignal(selectList);
      localStorage.setItem(`${LocalStorageDictionary.PREFIX}-${LocalStorageDictionary.CART_LIST}`, JSON.stringify(cartList()));
    })
  )
}, { functional: true, dispatch: false });
