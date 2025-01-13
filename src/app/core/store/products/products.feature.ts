import { createFeature, createReducer, on } from '@ngrx/store';
import { FeatureDictionary } from '../dictionaries/featureDictionary';
import { ProductsActions } from './products.actions';
import { ProductReferencePayload, ProductsState, ProductsSuccessLoadAction } from './products.models';
import { Product } from '../../../model/product';

const initialState: ProductsState = {
  list: [],
  hasError: false,
  pending: false,
  isPanelOpened: false,
  onEditProduct: null
}

export const productsFeature = createFeature({
  name: FeatureDictionary.PRODUCTS,
  reducer: createReducer(
    initialState,

    // PRODUCTS LOAD
    on(ProductsActions.loadProduct, (state: ProductsState): ProductsState => ({ ...state, pending: true, hasError: false })),
    on(ProductsActions.loadProductSuccess, (state: ProductsState, action: ProductsSuccessLoadAction): ProductsState => ({ ...state, list: [...action.items], pending: false, hasError: false })),
    on(ProductsActions.loadProductFail, (state: ProductsState): ProductsState => ({ ...state, list: initialState.list, pending: false, hasError: true })),

    // PRODUCT DELETE
    on(ProductsActions.deleteProduct, (state: ProductsState): ProductsState => ({ ...state, pending: true, hasError: false })),
    on(ProductsActions.deleteProductSuccess, (state: ProductsState, action: ProductReferencePayload): ProductsState => ({ ...state, list: state.list.filter(item => item.id !== action.id), pending: false, hasError: false })),
    on(ProductsActions.deleteProductFail, (state: ProductsState): ProductsState => ({ ...state, pending: false, hasError: true })),

    // PRODUCT ADD
    on(ProductsActions.addProduct, (state: ProductsState): ProductsState => ({ ...state, pending: true, hasError: false })),
    on(ProductsActions.addProductSuccess, (state: ProductsState, action: { item: Product }): ProductsState => ({ ...state, list: [...state.list, action.item], pending: false, hasError: false, isPanelOpened: false })),
    on(ProductsActions.addProductFail, (state: ProductsState): ProductsState => ({ ...state, pending: false, hasError: true, isPanelOpened: false})),

    // PRODUCT EDIT
    on(ProductsActions.editProduct, (state: ProductsState): ProductsState => ({ ...state, isPanelOpened: true, pending: true, hasError: false })),
    on(ProductsActions.editProductSuccess, (state: ProductsState, action: { item: Product }): ProductsState => ({ ...state, list: state.list.map(item => item.id === action.item.id ? action.item : item), pending: false, hasError: false, isPanelOpened: false, onEditProduct: null })),
    on(ProductsActions.editProductFail, (state: ProductsState): ProductsState => ({ ...state, pending: false, hasError: true, isPanelOpened: false, onEditProduct: null })),

    // UI
    on(ProductsActions.openProductModalAdd, (state: ProductsState): ProductsState => ({ ...state, isPanelOpened: true })),
    on(ProductsActions.openProductModalEdit, (state: ProductsState, action: { item: Partial<Product> }): ProductsState => ({ ...state, isPanelOpened: true, onEditProduct: action.item })),
    on(ProductsActions.closeProductModal, (state: ProductsState): ProductsState => ({ ...state, isPanelOpened: false, onEditProduct: null }))

  )
})

export const {
  selectList,
  selectHasError,
  selectPending,
  selectIsPanelOpened,
  selectOnEditProduct
} = productsFeature
