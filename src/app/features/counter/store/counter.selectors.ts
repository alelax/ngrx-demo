import { createSelector } from '@ngrx/store';
import { selectMultiplier, selectValue } from './counter.feature';

export const selectTotal = createSelector(
  selectValue,
  selectMultiplier,
  (value, multiplier) => value * multiplier
)
