import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Product } from '../../../../model/product';

@Component({
  selector: 'app-cms-products-modal',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cms-products-modal.component.html',
  styleUrl: './cms-products-modal.component.css'
})
export class CmsProductsModalComponent {
  isModalOpened = input<boolean>();
  closeModal = output();
  saveProduct = output<Partial<Product>>();
  onEditProduct = input.required<Partial<Product> | null>();

  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]]
  })

  constructor() {
    effect(() => {
      const productOnEdit = this.onEditProduct();
      if (productOnEdit) this.form.patchValue(productOnEdit);
      else this.form.reset();
    });
  }
}
