import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { FeatureDictionary } from '../dictionaries/featureDictionary';
import { AuthState } from './auth.models';
import { AuthActions } from './auth.actions';

const initialState: AuthState = {
  token: null,
  displayName: null
}

export const authFeature = createFeature({
  name: FeatureDictionary.AUTH,
  reducer: createReducer(
    initialState,
    on(AuthActions.initialize, (state: AuthState, action: { token: string | null, displayName: string | null}): AuthState => ({ ...state, token: action.token, displayName: action.displayName })),
    on(AuthActions.login, (state: AuthState): AuthState => ({ ...state, token: null })),
    on(AuthActions.loginSuccess, (state: AuthState, action: { token: string }): AuthState => ({ ...state, token: action.token })),
    on(AuthActions.logout, (state: AuthState): AuthState => ({ ...state, token: null, displayName: null })),
    on(AuthActions.getProfileSuccess, (state: AuthState, action: { displayName: string }): AuthState => ({ ...state, displayName: action.displayName }))
  ),
  extraSelectors: ({ selectToken }) => ({
    selectIsLogged: createSelector(
      selectToken,
      (token) => !!token
    )
  })
})

export const {
  selectToken,
  selectDisplayName,
  selectIsLogged
} = authFeature
