import {Injectable, linkedSignal, signal} from '@angular/core';
import { CartItem, CartAddActionPayload, CartProductReferencePayload } from '../../core/store/cart/cart.models';

import {BaseService} from '../core/base.service';

export interface CartRequest {
    PageSize?: number;
    IdCliente?: number;
}

//@Injectable()
@Injectable({providedIn: 'root'})
export class CartService extends BaseService<CartItem, CartRequest> {
/*
  selectIsCartEmpty = signal<boolean>(this.values().length === 0);
  selectTotalCartItem = signal<number>(this.values().reduce((total, item) => total + item.qty, 0));
  selectTotalCartCost = signal<number>(this.values().reduce((acc, item) => acc + (item.product.cost * item.qty), 0));
*/
  selectIsCartEmpty = linkedSignal<boolean>(() => this.values().length === 0);
  selectTotalCartItem = linkedSignal<number>(() => this.values().reduce((total, item) => total + item.qty, 0));
  selectTotalCartCost = linkedSignal<number>(() => this.values().reduce((acc, item) => acc + (item.product.cost * item.qty), 0));
  
  constructor() {
    super();
    this._url = 'http://localhost:3001/carts';
    this._key = 'product.id';

  }
 
  addProduct(action: CartAddActionPayload) {
    this.update({product: action.item, qty: 1});
  }

  increaseQuantity(action: CartProductReferencePayload) {
    const rec = this.values().find(item => item.product.id === action.id);
    if(rec){
        rec.qty += 1;
        this.update(rec);
    }
  }

  decreaseQuantity(action: CartProductReferencePayload) {
    const rec = this.values().find(item => item.product.id === action.id);
    if(rec && rec.qty>1){
        rec.qty -= 1;
        this.update(rec);
    }
  }

}
