import { createReducer, on } from '@ngrx/store';
import { decrement, DecrementAction, increment, reset } from './counter.actions';

export interface CounterState {
  value: number
}

const initialState: CounterState = { value: 0 };

export const counterReducer = createReducer(
  initialState,
  on(increment, (state: CounterState): CounterState => ({ ...state, value: state.value + 1 })),
  on(decrement, (state: CounterState, action: DecrementAction ): CounterState => ({  ...state, value: state.value - action.value })),
  on(reset, (state: CounterState): CounterState => ({  ...state, value: initialState.value }))
)

/* OLD VERSION */
export const counterReducerOLD = (state = initialState, action: any) => {
  switch (action.type) {
    case 'increment':
      return { value: state.value + 1 };
    case 'decrement':
      return { value: state.value - 1 }
    case 'reset':
      return { value: 0}
  }
  return state
};
