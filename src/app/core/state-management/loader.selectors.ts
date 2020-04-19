import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoaderState, loaderStorageName } from './loader.reducer';

export const loaderStore = createFeatureSelector(loaderStorageName);

export const getLoaderStatus = createSelector(loaderStore, (state: LoaderState) => state.status);
