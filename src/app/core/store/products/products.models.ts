import { Product } from '../../../model/product';


export interface ProductsState {
  list: Product[];
  hasError: boolean
  pending: boolean
  isPanelOpened: boolean,
  onEditProduct: Partial<Product> | null
}

export interface ProductsSuccessLoadAction {
  items: Product[]
}

export interface ProductReferencePayload {
  id: number
}
