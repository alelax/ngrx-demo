import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { counterActions } from './counter.actions';
import { FeatureDictionary } from '../../../core/store/dictionaries/featureDictionary';
import { DecrementAction, MultiplierUpdateAction } from './counter.models';

export interface CounterState {
  value: number
  multiplier: number
}

const initialState: CounterState = { value: 0, multiplier: 2 };

export const counterFeature = createFeature({
  name: FeatureDictionary.COUNTER,
  reducer: createReducer(
    initialState,
    on(counterActions.reset, (state: CounterState): CounterState => ({  ...state, value: initialState.value })),
    on(counterActions.increment, (state: CounterState): CounterState => ({ ...state, value: state.value + 1 })),
    on(counterActions.decrement, (state: CounterState, action: DecrementAction ): CounterState => {
      const nextValue = state.value - action.value;
      return { ...state, value: nextValue > 0 ? nextValue : 0 }
    }),
    on(counterActions.multiplierUpdate, (state: CounterState, action: MultiplierUpdateAction): CounterState => ({ ...state, multiplier: action.value }))
  ),
  extraSelectors: ({ selectValue, selectMultiplier}) => ({
    selectExtraSelectorTotal: createSelector(
      selectValue,
      selectMultiplier,
      (value, multiplier) => value * multiplier
    )
  })
})

export const {
  selectValue,
  selectMultiplier,
  selectExtraSelectorTotal
} = counterFeature;
