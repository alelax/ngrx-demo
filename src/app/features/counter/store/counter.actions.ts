import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NameSpaceDictionary } from '../../../core/store/dictionaries/namespaceDictionary';
import { ActionDictionary } from '../../../core/store/dictionaries/actionDictionary';
import { DecrementAction, MultiplierUpdateAction } from './counter.models';


export const counterActions = createActionGroup({
  source: NameSpaceDictionary.COUNTER,
  events: {
    [ActionDictionary.INCREMENT]: emptyProps(),
    [ActionDictionary.DECREMENT]: props<DecrementAction>(),
    [ActionDictionary.RESET]: emptyProps(),
    [ActionDictionary.MULTIPLIER_UPDATE]: props<MultiplierUpdateAction>(),
  }
})
