import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ProductsActions } from './products.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../model/product';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/operators';
import { selectOnEditProduct } from './products.feature';
import { ProductsIndex } from './products.index';

export const loadProducts = createEffect(
  () => { return ProductsIndex.LOAD_PRODUCTS_EXEC() },
  { functional: true }
);

export const addProduct = createEffect(
  () => { return ProductsIndex.ADD_PRODUCT_EXEC() },
  { functional: true }
);

export const editProduct = createEffect(
  () => { return ProductsIndex.EDIT_PRODUCT_EXEC()},
  { functional: true }
);

export const deleteProduct = createEffect(
  () => { return ProductsIndex.DELETE_PRODUCT_EXEC()},
  { functional: true }
);

export const saveProduct = createEffect(
  () => { return ProductsIndex.SAVE_PRODUCT_EXEC() },
  { functional: true }
);
