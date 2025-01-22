import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ProductsActions } from './products.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../model/product';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/operators';
import { selectOnEditProduct } from './products.feature';

export const loadProducts = createEffect(() => {
  const actions$ = inject(Actions);
  const http = inject(HttpClient);
  return actions$
    .pipe(
      ofType(ProductsActions.loadProduct),
      mergeMap(() => http.get<Product[]>('http://localhost:3001/products').pipe(
        map(items => ProductsActions.loadProductSuccess({ items })),
        catchError(() => of(ProductsActions.loadProductFail()))
      )),
    )
  },
  { functional: true }
);

export const addProduct = createEffect(() => {
  const actions$ = inject(Actions);
  const http = inject(HttpClient);
  return actions$
    .pipe(
      ofType(ProductsActions.addProduct),
      mergeMap(action => http.post<Product>('http://localhost:3001/products', action.item).pipe(
        map(item => ProductsActions.addProductSuccess({ item })),
        catchError(() => of(ProductsActions.addProductFail()))
      )),
    )
  },
  { functional: true }
);

export const editProduct = createEffect(() => {
  const actions$ = inject(Actions);
  const http = inject(HttpClient);
  return actions$
    .pipe(
      ofType(ProductsActions.editProduct),
      mergeMap(action => http.patch<Product>(`http://localhost:3001/products/${action.item.id}`, action.item).pipe(
        map(item => ProductsActions.editProductSuccess({ item })),
        catchError(() => of(ProductsActions.editProductFail()))
      )),
    )
  },
  { functional: true }
)

export const deleteProduct = createEffect(() => {
  const actions$ = inject(Actions);
  const http = inject(HttpClient);
  return actions$
    .pipe(
      ofType(ProductsActions.deleteProduct),
      mergeMap(action => http.delete(`http://localhost:3001/products/${action.id}`).pipe(
        map(() => ProductsActions.deleteProductSuccess({ id: action.id})),
        catchError(() => of(ProductsActions.deleteProductFail()))
      )),
    )
  },
  { functional: true }
)

export const saveProduct = createEffect(() => {
    const actions$ = inject(Actions);
    const store = inject(Store);
    return actions$.pipe(
      ofType(ProductsActions.saveProduct),
      concatLatestFrom(() => store.select(selectOnEditProduct)),
      map(([action, active]) => {
        if (!active?.id) return ProductsActions.addProduct({ item: action.item })
        else return ProductsActions.editProduct({ item: { id: active.id, ...action.item }})
      })
    );
  },
  { functional: true }
);
