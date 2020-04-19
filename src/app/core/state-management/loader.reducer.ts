import { Action, createReducer, on } from '@ngrx/store';
import { loadingFinished, loadingStarts } from './loader.actions';

export const loaderStorageName = 'loader';

export interface LoaderState {
  status: boolean;
}

const initialState: LoaderState = {
  status: false
};

const reducer = createReducer(
  initialState,
  on(
    loadingStarts,
    ((state: LoaderState) => ({
      ...state,
      status: true
    }))
  ),
  on(
    loadingFinished,
    ((state: LoaderState) => ({
      ...state,
      status: false
    }))
  )
);



export function loaderReducer(state: LoaderState | undefined, action: Action) {
  return reducer(state, action);
}
