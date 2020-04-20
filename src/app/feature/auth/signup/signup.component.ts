import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../state-management/auth.reducer';
import { resetError, signUp } from '../state-management/auth.actions';
import { getAuthError } from '../state-management/auth.selectors';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { getLoaderStatus } from '../../../core/state-management/loader.selectors';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  unsubscribe$: Subject<any> = new Subject<any>();

  readonly loader$: Observable<boolean> = this.store.select(getLoaderStatus);

  readonly error$: Observable<string> = this.store.select(getAuthError);

  readonly signupForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AuthState>,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.error$
      .pipe(
        takeUntil(this.unsubscribe$))
      .subscribe(error => {
        if (error) {
          this.errorMessage = this.authService.handleError(error);
          this.snackBar.open(this.errorMessage, '', {
            duration: 3000
          });
        }
      });
  }

  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    this.store.dispatch(
      signUp({
        email,
        password
      }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetError());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
