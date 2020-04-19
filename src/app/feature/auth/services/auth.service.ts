import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthErrors } from '../consts';
import { Store } from '@ngrx/store';
import { AuthState } from '../state-management/auth.reducer';
import { AngularFireAuth } from '@angular/fire/auth';
import { loginSuccess, logout } from '../state-management/auth.actions';
import { ProfileService } from '../../profile/services/profile.service';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(
    private http: HttpClient,
    private store: Store<AuthState>,
    private firebase: AngularFireAuth,
    private profileService: ProfileService
  ) {
  }

  autoLogin() {
    this.firebase.auth.onIdTokenChanged((user) => {
      if (user) {
        this.store.dispatch(loginSuccess({
          user: {email: user.email, id: user.uid}
        }));
        this.profileService.loadProfileData(user.uid);
      } else {
        this.store.dispatch(logout());
      }
    });
  }

  handleError(error: string) {
    let errorMessage = 'An unknown error occurred!';
    if (!error) {
      return errorMessage;
    }
    switch (error) {
      case AuthErrors.emailExist.errorName:
        errorMessage = AuthErrors.emailExist.message;
        break;
      case AuthErrors.emailNotFound.errorName:
        errorMessage = AuthErrors.emailNotFound.message;
        break;
      case AuthErrors.invalidPassword.errorName:
        errorMessage = AuthErrors.invalidPassword.message;
        break;
      case AuthErrors.userDisabled.errorName:
        errorMessage = AuthErrors.userDisabled.message;
        break;
    }
    return errorMessage;
  }
}
