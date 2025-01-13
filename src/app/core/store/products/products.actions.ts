import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NameSpaceDictionary } from '../dictionaries/namespaceDictionary';
import { ActionDictionary } from '../dictionaries/actionDictionary';
import { ProductReferencePayload, ProductsSuccessLoadAction } from './products.models';
import { Product } from '../../../model/product';

export const ProductsActions = createActionGroup({
  source: NameSpaceDictionary.PRODUCTS_API,
  events: {
    [ActionDictionary.PRODUCT_LOAD]: emptyProps(),
    [ActionDictionary.PRODUCT_LOAD_SUCCESS]: props<ProductsSuccessLoadAction>(),
    [ActionDictionary.PRODUCT_LOAD_FAIL]: emptyProps(),
    [ActionDictionary.PRODUCT_DELETE]: props<ProductReferencePayload>(),
    [ActionDictionary.PRODUCT_DELETE_SUCCESS]: props<ProductReferencePayload>(),
    [ActionDictionary.PRODUCT_DELETE_FAIL]: emptyProps(),
    [ActionDictionary.PRODUCT_ADD]: props<{ item: Partial<Product> }>(),
    [ActionDictionary.PRODUCT_ADD_SUCCESS]: props<{ item: Product }>(),
    [ActionDictionary.PRODUCT_ADD_FAIL]: emptyProps(),
    [ActionDictionary.PRODUCT_EDIT]: props<{ item: Partial<Product> }>(),
    [ActionDictionary.PRODUCT_EDIT_SUCCESS]: props<{ item: Product }>(),
    [ActionDictionary.PRODUCT_EDIT_FAIL]: emptyProps(),
    [ActionDictionary.PRODUCT_OPEN_MODAL_ADD]: emptyProps(),
    [ActionDictionary.PRODUCT_OPEN_MODAL_EDIT]: props<{ item: Partial<Product> }>(),
    [ActionDictionary.PRODUCT_CLOSE_MODAL]: emptyProps(),
    [ActionDictionary.PRODUCT_SAVE]: props<{ item: Partial<Product> }>(),
  }
})
