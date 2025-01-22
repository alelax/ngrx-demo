import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NameSpaceDictionary } from '../dictionaries/namespaceDictionary';
import { ActionDictionary } from '../dictionaries/actionDictionary';

export const AuthActions = createActionGroup({
  source: NameSpaceDictionary.AUTH,
  events: {
    [ActionDictionary.AUTH_LOGIN]: props<{ username: string, password: string }>(),
    [ActionDictionary.AUTH_LOGIN_SUCCESS]: props<{ token: string }>(),
    [ActionDictionary.AUTH_LOGIN_FAIL]: emptyProps(),
    [ActionDictionary.AUTH_LOGOUT]: emptyProps(),
    [ActionDictionary.AUTH_GET_PROFILE]: props<{ token: string }>(),
    [ActionDictionary.AUTH_GET_PROFILE_SUCCESS]: props<{ displayName: string }>(),
    [ActionDictionary.AUTH_GET_PROFILE_FAIL]: emptyProps(),
  }
})
