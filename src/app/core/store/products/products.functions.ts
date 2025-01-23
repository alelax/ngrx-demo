import { inject } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { ProductsActions } from './products.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Product } from '../../../model/product';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/operators';
import { selectOnEditProduct } from './products.feature';

export const loadProductsExec = () => {
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
}

export const addProductExec = () => {
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
}

export const editProductExec = () => {
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
}

export const deleteProductExec = () => {
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
}

export const saveProductExec = () => {
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
}
