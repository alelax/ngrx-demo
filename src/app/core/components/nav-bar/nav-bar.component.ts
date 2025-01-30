import { Component, inject, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsCartEmpty, selectTotalCartCost, selectTotalCartItem } from '../../store/cart/cart.feature';
import { selectDisplayName, selectIsLogged } from '../../store/auth/auth.feature';
import { AuthActions } from '../../store/auth/auth.actions';
import { IfLoggedDirective } from '../../auth/if-logged.directive';
import { CartService } from '../../../eg-lib/services/cart.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, IfLoggedDirective],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  store = inject(Store);

  cartservice = inject(CartService);

//  isCartEmpty = this.store.selectSignal(selectIsCartEmpty);
//  totalCartItems = this.store.selectSignal(selectTotalCartItem);
//  totalCartCost = this.store.selectSignal(selectTotalCartCost);
  displayName = this.store.selectSignal(selectDisplayName);
  isLogged = this.store.selectSignal(selectIsLogged);

  isCartEmpty = linkedSignal(() => this.cartservice.selectIsCartEmpty());
  totalCartItems = linkedSignal(() => this.cartservice.selectTotalCartItem());
  totalCartCost = linkedSignal(() => this.cartservice.selectTotalCartCost());

  logout() {
    this.store.dispatch(AuthActions.logout())
  }
}
