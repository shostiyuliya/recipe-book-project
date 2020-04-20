import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../state-management/auth.reducer';
import { login, resetError } from '../state-management/auth.actions';
import { Observable, Subject } from 'rxjs';
import { getAuthError } from '../state-management/auth.selectors';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { getLoaderStatus } from '../../../core/state-management/loader.selectors';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  readonly loader$: Observable<boolean> = this.store.select(getLoaderStatus);

  readonly error$: Observable<string> = this.store.select(getAuthError);

  readonly loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  unsubscribe$: Subject<void> = new Subject<void>();

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
      .pipe(takeUntil(this.unsubscribe$))
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
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.store.dispatch(
      login({
        email,
        password
      })
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetError());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
