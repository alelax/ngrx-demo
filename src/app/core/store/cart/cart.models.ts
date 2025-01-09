import { Product } from '../../../model/product';

export interface CartItem {
  product: Product,
  qty: number
}

export interface CartList {
  items: CartItem[]
}

export interface CartState {
  list: CartItem[]
}

export interface CartAddActionPayload {
  item: Product
}

export interface CartProductReferencePayload {
  id: number
}
