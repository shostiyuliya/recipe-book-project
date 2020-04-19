import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState, profileStorageName } from './profile.reducer';

export const profileStore = createFeatureSelector(profileStorageName);

export const getFavorites = createSelector(profileStore, (state: ProfileState) => state.favorites);

export const getShoppingList = createSelector(profileStore,(state: ProfileState) => state.shoppingList);
