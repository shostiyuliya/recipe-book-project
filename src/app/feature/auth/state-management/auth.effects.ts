import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { login, loginFail, loginSuccess, logout, signUp, signUpSuccess } from './auth.actions';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';
import { ProfileService } from '../../profile/services/profile.service';
import { fromPromise } from 'rxjs/internal-compatibility';
import UserCredential = firebase.auth.UserCredential;
import { AngularFireAuth } from '@angular/fire/auth';
import AuthError = firebase.auth.AuthError;
import { Store } from '@ngrx/store';
import { loadingFinished, loadingStarts } from '../../../core/state-management/loader.actions';

@Injectable()
export class AuthEffects {

  @Effect()
  signUpAction$ = this.actions$.pipe(
    ofType(signUp),
    switchMap((action) => {
      const { email, password } = action;
      this.store.dispatch(loadingStarts());
      return fromPromise(this.firebase.auth.createUserWithEmailAndPassword(email, password)).pipe(
        map((accountDetails: UserCredential) => {
          this.router.navigate(['/']);
          this.profileService.loadProfileData(accountDetails.user.uid);
          this.store.dispatch(loadingFinished());
          return signUpSuccess( {user: {
            email: accountDetails.user.email,
            id: accountDetails.user.uid
          } as UserModel});
        }),
        catchError((error: AuthError) => {
          return [loginFail({
            error: error.code
          })];
        })
      );
    })
  );

  @Effect()
  loginAction$ = this.actions$.pipe(
    ofType(login),
    switchMap((action) => {
      this.store.dispatch(loadingStarts());
      const { email, password } = action;
      return fromPromise(this.firebase.auth.signInWithEmailAndPassword(email, password)).pipe(
        concatMap((accountDetails: UserCredential) => {
          this.router.navigate(['/']);
          this.profileService.loadProfileData(accountDetails.user.uid);
          this.store.dispatch(loadingFinished());
          // TODO bad formatting. Move action to the new line.
          return [loginSuccess( {user: {
              email: accountDetails.user.email,
              id: accountDetails.user.uid
            } as UserModel
          })];
        }),
        catchError((error: AuthError) => {
          return [loginFail({
            error: error.code
          })];
        })
      );
    })
  );

  @Effect({dispatch: false})
  logoutAction$ = this.actions$.pipe(
    ofType(logout),
    switchMap(() => {
      return this.firebase.auth.signOut();
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService,
    private firebase: AngularFireAuth,
    private store: Store<any>
  ) {
  }
}
