import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ProductsActions } from './products.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../model/product';

export const loadProducts = createEffect(() => {
  const actions$ = inject(Actions);
  const http = inject(HttpClient);

  return actions$
    .pipe(
      ofType(ProductsActions.load),
      mergeMap(() => http.get<Product[]>('http://localhost:3001/products').pipe(
        map(items => ProductsActions.loadSuccess({ items })),
        catchError(() => of(ProductsActions.loadFail()))
      )),
    )
  },
  { functional: true }
);
