import { Component, inject, linkedSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectIsCartEmpty,
  selectList,
  selectTotalCartCost,
  selectTotalCartItem
} from '../../core/store/cart/cart.feature';
import { CartActions } from '../../core/store/cart/cart.actions';
import { CartItem } from '../../core/store/cart/cart.models';
import { RouterLink } from '@angular/router';
import { CartService } from '../../eg-lib/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export default class CartComponent {
//  store = inject(Store);
  cartservice = inject(CartService);

  isCartEmpty = linkedSignal(() => this.cartservice.selectIsCartEmpty());
  totalCartItems = linkedSignal(() => this.cartservice.selectTotalCartItem());
  totalCartCost = linkedSignal(() => this.cartservice.selectTotalCartCost());

//  isCartEmpty = this.store.selectSignal(selectIsCartEmpty);
//  cartList = this.store.selectSignal(selectList);
//  totalCartItems = this.store.selectSignal(selectTotalCartItem);
//  totalCartCost = this.store.selectSignal(selectTotalCartCost);

  protected deleteItem(item: CartItem): void {
//    this.store.dispatch(CartActions.remove({ id: item.product.id }));
    this.cartservice.remove(item);
  }

  protected clearCart() {
//    this.store.dispatch(CartActions.clear());
    this.cartservice.clear()
  }

  protected increaseQty(productId: number) {
//    this.store.dispatch(CartActions.increaseQuantity({ id: productId }));
    this.cartservice.increaseQuantity({ id: productId });
  }

  protected decreaseQty(productId: number) {
//    this.store.dispatch(CartActions.decreaseQuantity({ id: productId }));
    this.cartservice.decreaseQuantity({ id: productId });
  }
}
