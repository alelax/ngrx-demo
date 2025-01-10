import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { CartAddActionPayload, CartList, CartProductReferencePayload, CartState } from './cart.models';
import { FeatureDictionary } from '../dictionaries/featureDictionary';
import { CartActions } from './cart.actions';
import { addProduct, decreaseQuantity, increaseQuantity } from './cart.utils';

const initialState: CartState = {
  list: []
}

export const cartFeature = createFeature({
  name: FeatureDictionary.CART,
  reducer: createReducer(
    initialState,
    on(CartActions.add, (state: CartState, action: CartAddActionPayload): CartState => addProduct(state, action)),
    on(CartActions.remove, (state: CartState, action: CartProductReferencePayload): CartState => ({ ...state, list: state.list.filter(item => item.product.id !== action.id) })),
    on(CartActions.clear, (state: CartState): CartState => ({ ...state, list: [] })),
    on(CartActions.increaseQuantity, (state: CartState, action: CartProductReferencePayload): CartState => increaseQuantity(state, action)),
    on(CartActions.decreaseQuantity, (state: CartState, action: CartProductReferencePayload): CartState => decreaseQuantity(state, action)),
    on(CartActions.loadedFromLocalStorage, (state: CartState, action: CartList): CartState => ({ ...state, list: action.items }))
  ),
  extraSelectors: ({ selectList }) => ({
    selectIsCartEmpty: createSelector(
      selectList,
      (list) => list.length === 0
    ),
    selectTotalCartItem: createSelector(
      selectList,
      (list) => list.reduce((total, item) => total + item.qty, 0)
    ),
    selectTotalCartCost: createSelector(
      selectList,
      (list) => list.reduce((acc, item) => acc + (item.product.cost * item.qty), 0)
    )
  })
})

export const {
  selectList,
  selectIsCartEmpty,
  selectTotalCartItem,
  selectTotalCartCost
} = cartFeature
