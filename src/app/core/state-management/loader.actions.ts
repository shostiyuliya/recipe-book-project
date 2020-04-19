import { createAction } from '@ngrx/store';

export enum LoaderActionsTypes {
  LoadingStarts = '[LOADER] Loading starts',
  LoadingFinished = '[LOADER] Loading finished'
}

export const loadingStarts = createAction(
  LoaderActionsTypes.LoadingStarts
);

export const loadingFinished = createAction(
  LoaderActionsTypes.LoadingFinished
);

