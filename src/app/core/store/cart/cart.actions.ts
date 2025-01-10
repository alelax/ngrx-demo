import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NameSpaceDictionary } from '../dictionaries/namespaceDictionary';
import { ActionDictionary } from '../dictionaries/actionDictionary';
import { CartAddActionPayload, CartList, CartProductReferencePayload } from './cart.models';

export const CartActions = createActionGroup({
  source: NameSpaceDictionary.CART,
  events: {
    [ActionDictionary.CART_ADD_ITEM]: props<CartAddActionPayload>(),
    [ActionDictionary.CART_REMOVE_ITEM]: props<CartProductReferencePayload>(),
    [ActionDictionary.CART_CLEAR]: emptyProps(),
    [ActionDictionary.CART_INCREASE_QUANTITY]: props<CartProductReferencePayload>(),
    [ActionDictionary.CART_DECREASE_QUANTITY]: props<CartProductReferencePayload>(),
    [ActionDictionary.CART_LOADED_FROM_LOCAL_STORAGE]: props<CartList>(),
  }
})
