import {
  CartAddActionPayload,
  CartItem,
  CartProductReferencePayload,
  CartState
} from './cart.models';

export const addProduct = (state: CartState, action: CartAddActionPayload): CartState => {
  const productAlreadyInCart = state.list.find(item => item.product.id === action.item.id);
  return productAlreadyInCart
    ? { ...state, list: state.list.map(item => item.product.id === action.item.id ? { ...item, qty: item.qty + 1 } : item)}
    : { ...state, list: [...state.list, { product: action.item, qty: 1 }] }
};

export const increaseQuantity = (state: CartState, action: CartProductReferencePayload): CartState => {
  return {
    ...state,
    list: state.list.map(item => item.product.id === action.id ? { ...item, qty: item.qty + 1 } : item)
  }
}

export const decreaseQuantity = (state: CartState, action: CartProductReferencePayload): CartState => {
  const productAlreadyInCart = state.list.find(item => item.product.id === action.id);
  return productAlreadyInCart && productAlreadyInCart.qty > 1
    ? { ...state, list: state.list.map(item => item.product.id === action.id ? { ...item, qty: item.qty - 1 } : item)}
    : { ...state, list: state.list.filter( item => item.product.id !== action.id) }
}

