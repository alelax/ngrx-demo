import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectToken } from '../store/auth/auth.feature';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const token = store.selectSignal(selectToken);
  const router = inject(Router);

  if (router.url.includes('/cms') && token()) {
    return next(req.clone({
      setHeaders: {
        Authorization: `Bearer ${token()}`
      }
    }))
  }

  return next(req)
    .pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401:
              // redirect to login
              // router.navigateByUrl('/login')
              console.log(err)
              break;
            default:
            case 404:
              // do something else:
              // - router redirect
              // - show notification
              // - dispatch an action: store.dispatch(...)
              // ...
              console.log(err)
              break;
          }
        }
        return of(err)
      })
    );

};
