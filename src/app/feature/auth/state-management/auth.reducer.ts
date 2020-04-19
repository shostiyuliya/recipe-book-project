import { Action, createReducer, on } from '@ngrx/store';
import { loginFail, loginSuccess, logout, resetError, signUpSuccess } from './auth.actions';
import { UserModel } from '../models/user.model';

export const authStorageName = 'auth';

export interface AuthState {
  user: UserModel;
  error: string;
}

const initialState: AuthState = {
  user: null,
  error: null
};

const reducer = createReducer(
  initialState,
  on(
    signUpSuccess,
    (state: AuthState, action) => ({
      ...state,
      user: action.user,
      error: null
    })
  ),
  on(
    loginSuccess,
    ((state: AuthState, action) => ({
      ...state,
      user: action.user,
      error: null
    }))
  ),
  on(
    logout,
    (state: AuthState) => ({
      ...state,
      user: null
    })
  ),
  on(
    loginFail,
    (state: AuthState, action) => ({
      ...state,
      user: null,
      error: action.error
    })
  ),
  on(
    resetError,
    (state: AuthState) => ({
      ...state,
      error: null
    })
  )
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
