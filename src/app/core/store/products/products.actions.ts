import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NameSpaceDictionary } from '../dictionaries/namespaceDictionary';
import { ActionDictionary } from '../dictionaries/actionDictionary';
import { ProductsSuccessLoadAction } from './products.models';

export const ProductsActions = createActionGroup({
  source: NameSpaceDictionary.PRODUCTS_API,
  events: {
    [ActionDictionary.LOAD]: emptyProps(),
    [ActionDictionary.LOAD_SUCCESS]: props<ProductsSuccessLoadAction>(),
    [ActionDictionary.LOAD_FAIL]: emptyProps(),
  }
})
