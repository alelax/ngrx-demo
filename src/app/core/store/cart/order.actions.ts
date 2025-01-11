import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NameSpaceDictionary } from '../dictionaries/namespaceDictionary';
import { ActionDictionary } from '../dictionaries/actionDictionary';
import { OrderUserForm } from '../../../model/order-user-form';
import { CartItem } from './cart.models';

export const OrderActions = createActionGroup({
  source: NameSpaceDictionary.ORDER,
  events: {
    [ActionDictionary.ORDER_SEND]: props<{ user: OrderUserForm, cart: CartItem[] }>(),
    [ActionDictionary.ORDER_SEND_SUCCESS]: emptyProps(),
    [ActionDictionary.ORDER_SEND_FAIL]: emptyProps(),
  }
})
