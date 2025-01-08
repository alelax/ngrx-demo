import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../../core/store/products/products.actions';

@Component({
  selector: 'app-shop',
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export default class ShopComponent implements OnInit {

  store = inject(Store);

  ngOnInit() {
    this.store.dispatch(ProductsActions.load());
  }
}
