import { inject } from '@angular/core';
import { Actions, ofType, rootEffectsInit } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage.service';
import { AuthActions } from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { LocalStorageDictionary } from '../../dictionaries/localStorageDictionary';
import { Router } from '@angular/router';

export const loginExec = () => {
  const actions$ = inject(Actions);
  const http = inject(HttpClient);
  const localStorageService = inject(LocalStorageService);
  return actions$.pipe(
    ofType(AuthActions.login),
    mergeMap((action) => {
      const params = new HttpParams()
        .set('username', action.username)
        .set('password', action.password);

      return http.get<{ token: string }>('http://localhost:3001/login', { params }).pipe(
        tap(res => localStorageService.setValue(LocalStorageDictionary.TOKEN, res.token)),
        map((response) => AuthActions.loginSuccess({ token: response.token })),
        catchError(() => of(AuthActions.loginFail()))
      );

    })
  )
}

export const loginSuccessExec = () => {
  const actions$ = inject(Actions);
  const http = inject(HttpClient);
  const localStorageService = inject(LocalStorageService);
  return actions$.pipe(
    // wait the loginSuccess action
    ofType(AuthActions.loginSuccess),
    mergeMap((action) => {
      return http.get<{ displayName: string }>('http://localhost:3001/profile', {
        headers: {
          Authorization: `Bearer ${action.token}`
        }
      }).pipe(
        tap(res => localStorageService.setValue(LocalStorageDictionary.DISPLAY_NAME, res.displayName)),
        map((response) => AuthActions.getProfileSuccess({ displayName: response.displayName })),
        catchError(() => of(AuthActions.getProfileFail()))
      )
    })
  )
}

export const getProfileSuccessExec = () => {
  const actions$ = inject(Actions);
  const router = inject(Router);
  return actions$.pipe(
    ofType(AuthActions.getProfileSuccess),
    tap(() => router.navigateByUrl('cms'))
  )
}

export const syncWithLocalStorageExec = () => {
  const actions$ = inject(Actions);
  const localStorageService = inject(LocalStorageService);
  return actions$.pipe(
    ofType(rootEffectsInit),
    map(() => {
      const token = localStorageService.getValue(LocalStorageDictionary.TOKEN);
      const displayName = localStorageService.getValue(LocalStorageDictionary.DISPLAY_NAME);
      return AuthActions.initialize({ token, displayName });
    })
  )
}

export const logoutExec = () => {
  const actions$ = inject(Actions);
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  return actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => {
      localStorageService.removeValue(LocalStorageDictionary.TOKEN);
      localStorageService.removeValue(LocalStorageDictionary.DISPLAY_NAME);
      router.navigateByUrl('shop').then();
    })
  )
}
