import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../../core/store/products/products.actions';
import {
  selectHasError,
  selectIsPanelOpened,
  selectList, selectOnEditProduct,
  selectPending
} from '../../core/store/products/products.feature';
import { Product } from '../../model/product';
import { ReactiveFormsModule } from '@angular/forms';
import { CmsProductsBarComponent } from './components/cms-products-bar/cms-products-bar.component';
import { CmsProductsListComponent } from './components/cms-products-list/cms-products-list.component';
import { CmsProductsModalComponent } from './components/cms-products-modal/cms-products-modal.component';

@Component({
  selector: 'app-cms',
  imports: [
    ReactiveFormsModule,
    CmsProductsBarComponent,
    CmsProductsListComponent,
    CmsProductsModalComponent
  ],
  templateUrl: './cms.component.html',
  styleUrl: './cms.component.css'
})
export default class CmsComponent implements OnInit {

  store = inject(Store);

  products = this.store.selectSignal<Product[]>(selectList);
  onEditProduct = this.store.selectSignal<Partial<Product> | null>(selectOnEditProduct);
  pending = this.store.selectSignal<boolean>(selectPending);
  error = this.store.selectSignal<boolean>(selectHasError);
  isModalOpened = this.store.selectSignal<boolean>(selectIsPanelOpened);

  ngOnInit() {
    this.store.dispatch(ProductsActions.loadProduct());
  }

  protected deleteProduct(product: Product) {
    this.store.dispatch(ProductsActions.deleteProduct({ id: product.id }));
  }

  protected openModalToAddProduct() {
    this.store.dispatch(ProductsActions.openProductModalAdd());
  }

  protected openModalToEditProduct(product: Product) {
    this.store.dispatch(ProductsActions.openProductModalEdit({ item: product }));
  }

  protected closeModal() {
    this.store.dispatch(ProductsActions.closeProductModal());
  }

  protected save(product: Partial<Product>) {
    this.store.dispatch(ProductsActions.saveProduct({ item: product }));
  }

}
