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
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cms',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './cms.component.html',
  styleUrl: './cms.component.css'
})
export default class CmsComponent implements OnInit {

  store = inject(Store);
  fb = inject(FormBuilder);

  products = this.store.selectSignal<Product[]>(selectList);
  pending = this.store.selectSignal<boolean>(selectPending);
  error = this.store.selectSignal<boolean>(selectHasError);
  isModalOpened = this.store.selectSignal(selectIsPanelOpened);
  onEditProduct = this.store.selectSignal(selectOnEditProduct);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]]
  })

  ngOnInit() {
    this.store.dispatch(ProductsActions.loadProduct());
  }

  protected deleteProduct(product: Product, evt: MouseEvent) {
    evt.stopPropagation();
    this.store.dispatch(ProductsActions.deleteProduct({ id: product.id }));
  }

  protected openModalToAddProduct() {
    this.store.dispatch(ProductsActions.openProductModalAdd());
    this.form.reset();
  }

  protected openModalToEditProduct(product: Product) {
    this.store.dispatch(ProductsActions.openProductModalEdit({ item: product }));
    this.form.patchValue(product);
  }

  protected closeModal() {
    this.store.dispatch(ProductsActions.closeProductModal());
  }

  protected save() {
    if (this.onEditProduct()) this.editProduct()
    else this.addProduct();
  }

  private editProduct() {
    const editProduct: Partial<Product> = {
      ...this.form.value,
      id: this.onEditProduct()?.id
    }
    this.store.dispatch(ProductsActions.editProduct({ item: editProduct }));
  }

  private addProduct() {
    this.store.dispatch(ProductsActions.addProduct({ item: this.form.value }))
  }

}
