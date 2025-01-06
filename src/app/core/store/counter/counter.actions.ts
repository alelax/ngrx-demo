import { createAction, props } from '@ngrx/store';
import { NameSpaceDictionary } from '../dictionaries/namespace';
import { ActionDictionary } from '../dictionaries/action';

export interface DecrementAction {
  value: number
}

/**
 * @typedef {Object} StoreAction
 * @property {string} type
 * */

/**
 * createAction è un utility di NGRX che ritorna un oggetto che ha la proprietà "type" di tipo string
 * @return {StoreAction}
 * */
export const increment = createAction(`${NameSpaceDictionary.COUNTER} ${ActionDictionary.INCREMENT}`);
export const decrement = createAction(`${NameSpaceDictionary.COUNTER} ${ActionDictionary.DECREMENT}`, props<DecrementAction>());
export const reset = createAction(`${NameSpaceDictionary.COUNTER} ${ActionDictionary.RESET}`);

// export const increment = () => ({ type: 'increment' });
// export const decrement = () => ({ type: 'decrement' });
// export const reset = () => ({ type: 'reset' });
