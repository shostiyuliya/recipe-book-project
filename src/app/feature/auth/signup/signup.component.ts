import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../state-management/auth.reducer';
import { resetError, signUp } from '../state-management/auth.actions';
import { getAuthError } from '../state-management/auth.selectors';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { getLoaderStatus } from '../../../core/state-management/loader.selectors';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  // TODO add type to what you select from the store. Check all the project
  loader$ = this.store.select(getLoaderStatus);

  signupForm: FormGroup;

  errorSubs: Subscription;

  error$ = this.store.select(getAuthError);

  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AuthState>,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    // TODO you can do it when initialize your variable.
    this.signupForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    // TODO better use takeUntil way of unsubscribe.
    this.errorSubs = this.error$.subscribe(error => {
      if (error) {
        this.errorMessage = this.authService.handleError(error);
        this.snackBar.open(this.errorMessage, '', {
          duration: 3000,
        });
      }
    });
  }

  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    this.store.dispatch(signUp({
      email,
      password
    }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetError());
    this.errorSubs.unsubscribe();
  }
}