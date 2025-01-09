import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectIsCartEmpty,
  selectList,
  selectTotalCartCost,
  selectTotalCartItem
} from '../../core/store/cart/cart.feature';
import { CartActions } from '../../core/store/cart/cart.actions';
import { CartItem } from '../../core/store/cart/cart.models';


@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export default class CartComponent {
  store = inject(Store);
  isCartEmpty = this.store.selectSignal(selectIsCartEmpty);
  cartList = this.store.selectSignal(selectList);
  totalCartItems = this.store.selectSignal(selectTotalCartItem);
  totalCartCost = this.store.selectSignal(selectTotalCartCost);

  protected deleteItem(item: CartItem): void {
    this.store.dispatch(CartActions.remove({ id: item.product.id }));
  }

  protected clearCart() {
    this.store.dispatch(CartActions.clear());
  }

  protected increaseQty(productId: number) {
    this.store.dispatch(CartActions.increaseQuantity({ id: productId }));
  }

  protected decreaseQty(productId: number) {
    this.store.dispatch(CartActions.decreaseQuantity({ id: productId }));
  }
}
