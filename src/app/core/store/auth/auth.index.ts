import {
  loginExec,
  loginSuccessExec,
  logoutExec,
  getProfileSuccessExec,
  syncWithLocalStorageExec
} from './auth.functions';

export const AuthIndex = {
  LOGIN_EXEC: loginExec,
  LOGIN_SUCCESS_EXEC: loginSuccessExec,
  GET_PROFILE_SUCCESS_EXEC: getProfileSuccessExec,
  SYNC_WITH_LOCAL_STORAGE_EXEC: syncWithLocalStorageExec,
  LOGOUT_EXEC: logoutExec
}
