import {Injectable, resource} from '@angular/core';
import {LoginResponse} from 'eg-lib/models';
import {LoginRequest} from 'eg-lib/models';

@Injectable()
export class LoginService {
  private req: LoginRequest = {
    Interno: 'l0BcfINUfL%vbEz',
    SecretGioielleria: 'easyprodemo',
    pwdCrypto: 'LY1npMcDWWwSR0U8W604Dw==',
    username: 'admin',
  };

  public loginResource = resource<LoginResponse, LoginRequest>({
    request: () => this.req,
    loader: async ({request, abortSignal}) => {
      const response = await fetch('https://webapitest.easygold.pro/api/vi1/users/logingettoken2', {
        signal: abortSignal,
        headers: {
          //              'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(request),
      });

      if (!response.ok) throw new Error('Unable to load token!');
      return ((await response.json()) as LoginResponse) || '';
    },
  });
}
