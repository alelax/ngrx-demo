import { createEffect } from '@ngrx/effects';
import { AuthIndex } from './auth.index';

export const login = createEffect(
  () =>  { return AuthIndex.LOGIN_EXEC() },
  { functional: true }
);

export const loginSuccess = createEffect(
  () => { return AuthIndex.LOGIN_SUCCESS_EXEC() },
  { functional: true }
);

export const getProfileSuccess = createEffect(
  () => { return AuthIndex.GET_PROFILE_SUCCESS_EXEC() },
  { functional: true, dispatch: false }
);

export const syncWithLocalStorage = createEffect(
  () => { return AuthIndex.SYNC_WITH_LOCAL_STORAGE_EXEC() },
  { functional: true }
)

export const logout = createEffect(
  () => { return AuthIndex.LOGOUT_EXEC() },
  { functional: true, dispatch: false }
);
