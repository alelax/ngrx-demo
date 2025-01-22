import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../core/store/auth/auth.actions';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  store = inject(Store);
  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  protected login() {
    this.store.dispatch(AuthActions.login({
      username: this.form.getRawValue().username,
      password: this.form.getRawValue().password
    }))

    console.log(this.form.getRawValue())
  }
}
