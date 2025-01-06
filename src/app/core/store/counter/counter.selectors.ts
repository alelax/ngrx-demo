import { AppState } from '../../../app.config';

export const selectCounterValue = (state: AppState) => state.counter.value
