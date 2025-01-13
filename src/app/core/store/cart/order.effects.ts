import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderActions } from './order.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { CartActions } from './cart.actions';
import { Router } from '@angular/router';

export const sendOrder = createEffect(() => {
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
}, { functional: true })

export const sendOrderSuccess = createEffect((
    actions$ = inject(Actions),
    router = inject(Router),
  ) => {
    return actions$.pipe(
      ofType(OrderActions.sendSuccess),
      map(() => CartActions.clear()),
      tap(() => {
        router.navigateByUrl('/shop').then()
      })
    );
  },
  { functional: true}
);
