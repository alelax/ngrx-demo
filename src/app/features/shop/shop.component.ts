import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../../core/store/products/products.actions';
import { Product } from '../../model/product';
import { CartActions } from '../../core/store/cart/cart.actions';
import { ShopFiltersComponent } from './components/shop-filters/shop-filters.component';
import { ShopFilters } from '../../model/shop-filters';
import { ShopFiltersActions } from '../../core/store/shop/shop-filters.actions';
import { selectFilteredList, selectShopFiltersState } from '../../core/store/shop/shop-filters.feature';
import { UiActions } from '../../core/store/ui/ui.actions';
import { selectSidePanelOpened } from '../../core/store/ui/ui.feature';

@Component({
  selector: 'app-shop',
  imports: [ShopFiltersComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export default class ShopComponent implements OnInit {

  store = inject(Store);

  products = this.store.selectSignal<Product[]>(selectFilteredList);
  sidePanelIsOpen = this.store.selectSignal<boolean>(selectSidePanelOpened);
  filters = this.store.selectSignal<ShopFilters>(selectShopFiltersState);

  ngOnInit() {
    this.store.dispatch(ProductsActions.load());
  }

  protected addProductToCart(product: Product) {
    this.store.dispatch(CartActions.add({ item: product}));
  }

  protected updateFilters(filters: Partial<ShopFilters>) {
    this.store.dispatch(ShopFiltersActions.update({ filters }));
  }

  protected togglePanel() {
    this.store.dispatch(UiActions.toggleSidePanel());
  }

  protected closeSidePanel() {
    this.store.dispatch(UiActions.closeSidePanel());
  }

}
