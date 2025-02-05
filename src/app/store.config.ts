import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { productsFeature } from './core/store/products/products.feature';
import { cartFeature } from './core/store/cart/cart.feature';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { shopFiltersFeature } from './core/store/shop/shop-filters.feature';
import { uiFeature } from './core/store/ui/ui.feature';
import * as productsEffects from './core/store/products/products.effects';
import * as cartEffects from './core/store/cart/cart.effects';
import * as orderEffects from './core/store/cart/order.effects';
import * as authEffects from './core/store/auth/auth.effects';
import { authFeature } from './core/store/auth/auth.feature';

export const StoreSettings = [
  provideStore({}, {
    runtimeChecks: {
      strictStateSerializability: true,
      strictActionSerializability: true,
      strictActionTypeUniqueness: true,
    }
  }),
  provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
];

export const Stores = [
  provideState({ name: 'home', reducer: () => [1, 2, 3] }),
  provideState(productsFeature),
  provideState(cartFeature),
  provideState(shopFiltersFeature),
  provideState(uiFeature),
  provideState(authFeature)
]

export const StoreEffects = [
  provideEffects([
    productsEffects,
    cartEffects,
    orderEffects,
    authEffects
  ])
]
