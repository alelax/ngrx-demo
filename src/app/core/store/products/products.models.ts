import { Product } from '../../../model/product';


export interface ProductsState {
  list: Product[];
  hasError: boolean
  pending: boolean
}

export interface ProductsSuccessLoadAction {
  items: Product[]
}
