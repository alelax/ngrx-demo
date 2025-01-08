import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../../core/store/products/products.actions';
import { selectList } from '../../core/store/products/products.feature';

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
}
