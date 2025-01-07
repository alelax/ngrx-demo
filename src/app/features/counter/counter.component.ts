import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { counterActions } from './store/counter.actions';
import { selectExtraSelectorTotal, selectMultiplier, selectValue } from './store/counter.feature';
import { selectTotal } from './store/counter.selectors';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export default class CounterComponent {

  store = inject(Store);

  counter = this.store.selectSignal(selectValue);
  multiplier = this.store.selectSignal(selectMultiplier);
  total = this.store.selectSignal(selectTotal);
  extraTotal = this.store.selectSignal(selectExtraSelectorTotal);


  /**
   * Increment the counter by 1 unit
   * @return {void} Dispatch store action to increment counter store by 1
   *
   */
  inc(): void {
    this.store.dispatch(counterActions.increment());
  }

  /**
  * Decrement the counter by 1 unit
  * @return {void} Dispatch store action to decrement counter store by 1
  * */
  dec(): void {
    this.store.dispatch(counterActions.decrement({ value: 1 }));
  }

  /**
   * Reset the counter to 0
   * @return {void} Dispatch store action to reset counter store
  * */
  reset(): void {
    this.store.dispatch(counterActions.reset());
  }

  /**
   * Set multiplier to passed value
   * @param {number} value
   * @return {void} Dispatch store action to set multiplier to 5
   * */
  changeMultiplaier(value: number) {
    this.store.dispatch(counterActions.multiplierUpdate({ value }));
  }

}
