import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authStorageName } from './auth.reducer';

export const authStore = createFeatureSelector(authStorageName);

export const getAccountDetails = createSelector(authStore, (state: AuthState) => state.user);

export const getAuthError = createSelector(authStore,(state: AuthState) => state.error);
