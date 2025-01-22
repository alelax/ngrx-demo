import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { counterFeature } from './features/counter/store/counter.feature';
import { orderExistGuard } from './core/guards/order-exist.guard';

export const routes: Routes = [
  {
    path: 'counter',
    loadComponent: () => import('./features/counter/counter.component'),
    providers: [
      provideState(counterFeature),
    ]
  },
  { path: 'shop', loadComponent: () => import('./features/shop/shop.component')},
  { path: 'cart', loadComponent: () => import('./features/cart/cart.component')},
  {
    path: 'order-form',
    loadComponent: () => import('./features/shop-order-form/shop-order-form.component'),
    canActivate: [orderExistGuard]
  },
  { path: 'cms', loadComponent: () => import('./features/cms/cms.component')},
  { path: 'login', loadComponent: () => import('./features/login/login.component')},
  { path: '', redirectTo: 'shop', pathMatch: 'full' }
];
