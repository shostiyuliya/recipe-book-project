import { createAction, props } from '@ngrx/store';
import { UserModel } from '../models/user.model';

export enum AuthActionsTypes {
  SignUp = '[AUTH] Sign Up',
  SignUpSuccess = '[AUTH] Sign Up Success',
  Login = '[AUTH] Login',
  LoginSuccess = '[AUTH] Login Success',
  Logout = '[AUTH] Logout',
  LoginFail = '[AUTH] Login fail',
  ResetError = '[AUTH] Reset error'
}

export const signUp = createAction(
  AuthActionsTypes.SignUp,
  props<{
    email: string,
    password: string
  }>()
);

export const signUpSuccess = createAction(
  AuthActionsTypes.SignUpSuccess,
  props<{user: UserModel}>()
);

export const login = createAction(
  AuthActionsTypes.Login,
  props<{
    email: string,
    password: string
  }>()
);

export const loginSuccess = createAction(
  AuthActionsTypes.LoginSuccess,
  props<{
    user: UserModel
  }>()
);

export const logout = createAction(
  AuthActionsTypes.Logout,
);

export const loginFail = createAction(
  AuthActionsTypes.LoginFail,
  props<{
    error: string
  }>()
);

export const resetError = createAction(
  AuthActionsTypes.ResetError
);

