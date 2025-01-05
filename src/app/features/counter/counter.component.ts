import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export default class CounterComponent {
  store = inject(Store);
  counter = this.store.selectSignal(state => state.counter.value);

  inc() {
    this.store.dispatch({ type: 'increment' });
  }

  dec() {
    this.store.dispatch({ type: 'decrement' });
  }

  reset() {
    this.store.dispatch({ type: 'reset' });
  }

}
