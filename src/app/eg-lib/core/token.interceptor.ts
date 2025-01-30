import {Injectable, inject} from '@angular/core';
import {environment} from '@env/environment';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  //  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import {Observable, throwError, BehaviorSubject, from} from 'rxjs';
import {catchError, switchMap, filter, take, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

//import {AuthenticationService} from '@shared/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
//  private authservice: AuthenticationService;
  private isRefreshingToken = false;
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private router: Router;

  constructor() {
//    this.authservice = inject(AuthenticationService);
    this.router = inject(Router);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isApiUrl = request.url.startsWith(environment.INSTANCE_URL);

    // Check if we need additional token logic or not
    if (!isApiUrl) {
      return next.handle(request);
    } else {
      const tstart = Date.now();
      return next.handle(this.addToken(request, localStorage.getItem("access_token") /*this.authservice.accesstoken*/)).pipe(
        tap((event: HttpEvent<any>) => {
          if (environment.LOGHTTP && request.url.startsWith('http') && event.type === 4) {
            console.log('Outgoing HTTP request');
            console.log('              URL:', request.url);
            console.log('             body:', request.body);
            console.log('Incoming HTTP response');
            console.log('           status:', event.status);
            console.log('             body:', event.body);
            console.log('          elapsed:', Date.now() - tstart);
            if (environment.TRACE) {
              console.log('Call stack');
              console.trace();
            }
          }
        }),
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            switch (err.status) {
              //              case 400:
              //                return this.handle400Error(err);
              case 401:
                return this.handle401Error(request, next);
              default:
                return throwError(() => err);
            }
          } else {
            return throwError(() => err);
          }
        })
      );
    }
  }

  // Add our current access token from the service if present
  private addToken(req: HttpRequest<any>, acctok?: string | null) {
    const key = acctok ?? environment.SUPABASE_SERVICE_ROLE;
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${key}`,
        apikey: `${environment.SUPABASE_KEY}`,
      },
    });
  }

  // Indicates our access token is invalid, try to load a new one
  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Check if another call is already using the refresh logic
    if (!this.isRefreshingToken) {
      // Set to null so other requests will wait
      // until we got a new token!
      this.tokenSubject.next("");
      this.isRefreshingToken = true;
      //      this.apiService.currentAccessToken = null;

      // First, get a new access token
      const rtoken = null;  //this.authservice.refreshtoken;
      if (rtoken)
        //        return from(this.authservice.refreshToken(rtoken)).pipe(
        return from(rtoken).pipe(
          switchMap((data: any) => {
            this.isRefreshingToken = false;
            if (data) {
              // Store the new token
              //            return this.apiService.storeAccessToken(accessToken).pipe(
              //              switchMap(_ => {
              // Use the subject so other calls can continue with the new token
              this.tokenSubject.next(data.access_token);

              // Perform the initial request again with the new token
              return next.handle(this.addToken(request, data.access_token));

              //              })
              //            );
            } else {
              // No new token or other problem occurred
              //            this.loginservice.logout();
  //            this.authservice.clearTokens();
  //            this.authservice.setAuthentication();
              localStorage.removeItem("access_token");
              return from(this.router.navigate(['/'], {replaceUrl: true}));
              //            return of(null);
            }
          })
          //        catchError((error) => of(error)),
          /*
          finalize(() => {
            // Unblock the token reload logic when everything is done
            this.isRefreshingToken = false;
          })
*/
          /*
          catchError((err) => {
            this.isRefreshingToken = false;
            return this.handle400Error(err);
          })
*/
        );
      else return from(this.router.navigate(['/'], {replaceUrl: true}));
    } //else
    // "Queue" other calls while we load a new token
    return this.tokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => {
        // Perform the request again now that we got a new token!
        return next.handle(this.addToken(request, token));
      })
    );
  }
}
