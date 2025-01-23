import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType, rootEffectsInit } from '@ngrx/effects';
import { CartActions } from './cart.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { selectList } from './cart.feature';
import { LocalStorageDictionary } from '../../dictionaries/localStorageDictionary';
import { HttpClient } from '@angular/common/http';
import { OrderActions } from './order.actions';
import { Router } from '@angular/router';

export const saveCartInLocalStorageExec = () => {
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
}

export const loadCartFromLocalStorageExec = () => {
  const actions$ = inject(Actions);
  return actions$.pipe(
    ofType(rootEffectsInit),
    map(() => {
      const cartFromLocalStorage = localStorage.getItem(`${LocalStorageDictionary.PREFIX}-${LocalStorageDictionary.CART_LIST}`);
      return cartFromLocalStorage
        ? CartActions.loadedFromLocalStorage({ items: JSON.parse(cartFromLocalStorage) })
        : CartActions.loadedFromLocalStorage({ items: [] })
    })
  )
}

export const clearCartLocalStorageExec = () => {
  const actions$ = inject(Actions);
  return actions$.pipe(
    ofType(CartActions.clear),
    tap(() => {
      localStorage.removeItem(`${LocalStorageDictionary.PREFIX}-${LocalStorageDictionary.CART_LIST}`)
    })
  );
}

export const sendOrderExec = () => {
  const actions$ = inject(Actions);
  const http = inject(HttpClient);
  return actions$.pipe(
    ofType(OrderActions.send),
    mergeMap(action =>
      http.post('http://localhost:3001/orders', { user: action.user, cart: action.cart }).pipe(
        map(() => OrderActions.sendSuccess()),
        catchError(() => of(OrderActions.sendFail()))
      )
    )
  );
}

export const sendOrderSuccessExec = () => {
  const actions$ = inject(Actions);
  const router = inject(Router);
  return actions$.pipe(
    ofType(OrderActions.sendSuccess),
    map(() => CartActions.clear()),
    tap(() => {
      router.navigateByUrl('/shop').then()
    })
  );
}
