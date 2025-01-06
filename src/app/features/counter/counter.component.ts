import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.config';
import { decrement, increment, reset } from '../../core/store/counter/counter.actions';
import { selectCounterValue } from '../../core/store/counter/counter.selectors';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export default class CounterComponent {
  store = inject(Store);
  counter = this.store.selectSignal(selectCounterValue);

  /**
   * Increment the counter by 1 unit
   * @return {void} Dispatch store action to increment counter store by 1
   *
   */
  inc(): void {
    this.store.dispatch(increment());
  }

  /**
  * Decrement the counter by 1 unit
  * @return {void} Dispatch store action to decrement counter store by 1
  * */
  dec(): void {
    this.store.dispatch(decrement({ value: 1 }));
  }

  /**
   * Reset the counter to 0
   * @return {void} Dispatch store action to reset counter store
  * */
  reset(): void {
    this.store.dispatch(reset());
  }

}
