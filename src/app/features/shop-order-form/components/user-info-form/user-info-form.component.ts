import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { OrderUserForm } from '../../../../model/order-user-form';

@Component({
  selector: 'app-user-info-form',
  imports: [
    ReactiveFormsModule, JsonPipe
  ],
  templateUrl: './user-info-form.component.html',
  styleUrl: './user-info-form.component.css'
})
export class UserInfoFormComponent {

  fb = inject(FormBuilder);

  confirm = output<OrderUserForm>()

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
  })

  confirmOrder() {
    this.confirm.emit(this.form.value as OrderUserForm);
  }
}
