import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsCartEmpty, selectTotalCartCost, selectTotalCartItem } from '../../store/cart/cart.feature';
import { selectDisplayName, selectIsLogged } from '../../store/auth/auth.feature';
import { AuthActions } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  store = inject(Store);
  isCartEmpty = this.store.selectSignal(selectIsCartEmpty);
  totalCartItems = this.store.selectSignal(selectTotalCartItem);
  totalCartCost = this.store.selectSignal(selectTotalCartCost);
  displayName = this.store.selectSignal(selectDisplayName);
  isLogged = this.store.selectSignal(selectIsLogged);

  logout() {
    this.store.dispatch(AuthActions.logout())
  }
}
