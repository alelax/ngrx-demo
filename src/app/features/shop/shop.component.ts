import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../../core/store/products/products.actions';
import { selectList } from '../../core/store/products/products.feature';
import { Product } from '../../model/product';
import { CartActions } from '../../core/store/cart/cart.actions';

@Component({
  selector: 'app-shop',
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export default class ShopComponent implements OnInit {

  store = inject(Store);
  products = this.store.selectSignal(selectList);

  ngOnInit() {
    this.store.dispatch(ProductsActions.load());
  }

  protected addProductToCart(product: Product) {
    this.store.dispatch(CartActions.add({ item: product}));
  }

}
