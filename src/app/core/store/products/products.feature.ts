import { Product } from '../../../model/product';
import { createFeature, createReducer, on } from '@ngrx/store';
import { FeatureDictionary } from '../dictionaries/featureDictionary';
import { ProductsActions } from './products.actions';
import { ProductsSuccessLoadAction } from './products.models';

export interface ProductsState {
  list: Product[];
  hasError: boolean
  pending: boolean
}

const initialState: ProductsState = {
  list: [],
  hasError: false,
  pending: false
}

export const productsFeature = createFeature({
  name: FeatureDictionary.PRODUCTS,
  reducer: createReducer(
    initialState,
    on(ProductsActions.load, (state: ProductsState): ProductsState => ({ ...state, pending: true, hasError: false })),
    on(ProductsActions.loadSuccess, (state: ProductsState, action: ProductsSuccessLoadAction): ProductsState => ({ ...state, list: [...action.items], pending: false, hasError: false })),
    on(ProductsActions.loadFail, (state: ProductsState): ProductsState => ({ ...state, list: initialState.list, pending: false, hasError: true }))
  )
})

export const {
  selectList,
  selectHasError,
  selectPending
} = productsFeature
