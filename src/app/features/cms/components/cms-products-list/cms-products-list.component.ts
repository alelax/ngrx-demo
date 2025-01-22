import { Component, input, output } from '@angular/core';
import { Product } from '../../../../model/product';

@Component({
  selector: 'app-cms-products-list',
  imports: [],
  templateUrl: './cms-products-list.component.html',
  styleUrl: './cms-products-list.component.css'
})
export class CmsProductsListComponent {
  products = input.required<Product[]>();
  delete = output<Product>();
  openModal = output<Product>();

  protected deleteProduct(product: Product, evt: MouseEvent) {
    evt.stopPropagation();
    this.delete.emit(product)
  }
}
