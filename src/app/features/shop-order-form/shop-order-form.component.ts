import { Component, inject } from '@angular/core';
import { UserCartSummaryComponent } from './components/user-cart-summary/user-cart-summary.component';
import { UserInfoFormComponent } from './components/user-info-form/user-info-form.component';
import { OrderUserForm } from '../../model/order-user-form';
import { Store } from '@ngrx/store';
import { selectList, selectTotalCartCost } from '../../core/store/cart/cart.feature';
import { CartItem } from '../../core/store/cart/cart.models';
import { JsonPipe } from '@angular/common';
import { OrderActions } from '../../core/store/cart/order.actions';

@Component({
  selector: 'app-shop-order-form',
  imports: [
    UserCartSummaryComponent,
    UserInfoFormComponent,
    JsonPipe
  ],
  templateUrl: './shop-order-form.component.html',
  styleUrl: './shop-order-form.component.css'
})
export default class ShopOrderFormComponent {

  store = inject(Store);

  cartList = this.store.selectSignal<CartItem[]>(selectList);
  cartTotalCost = this.store.selectSignal<number>(selectTotalCartCost);

  protected sendOrder(formData: OrderUserForm) {
    this.store.dispatch(OrderActions.send({ user: formData, cart: this.cartList() }));
  }
}
