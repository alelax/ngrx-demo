import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { debounceTime } from 'rxjs';
import { ShopFilters } from '../../../../model/shop-filters';

@Component({
  selector: 'app-shop-filters',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './shop-filters.component.html',
  styleUrl: './shop-filters.component.css'
})
export class ShopFiltersComponent {

  fb = inject(FormBuilder);

  isOpen = input.required<boolean>();
  filters = input.required<ShopFilters>();

  changeFilters = output<Partial<ShopFilters>>();
  close = output<void>();

  form = this.fb.nonNullable.group({
    text: '',
    cost: 10,
    wood: true,
    plastic: true,
    paper: false
  });

  constructor() {

    effect(() => {
      const filters = this.filters();
      if (filters) this.form.patchValue(filters, { emitEvent: false });
    });

    this.form.valueChanges
      .pipe(
        debounceTime(700)
      )
      .subscribe(() => this.changeFilters.emit(this.form.value) );
  }

}
