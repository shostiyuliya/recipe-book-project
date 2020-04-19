import { Action, createReducer, on } from '@ngrx/store';
import { clearProfileData, deleteFromFavorites, fetchFavoritesRecipes, fetchShoppingListSuccess } from './profile.actions';
import { RecipeModel } from '../../homepage/recipes/models/recipe.model';
import { IngredientModel } from '../../homepage/recipes/recipes-list/recipe-detail/models/ingredient.model';

export const profileStorageName = 'profile';

export interface ProfileState {
  favorites: RecipeModel[];
  shoppingList: IngredientModel[];
}

const initialState: ProfileState = {
  favorites: null,
  shoppingList: null
};

const reducer = createReducer(
  initialState,
  on(
    fetchFavoritesRecipes,
    (state: ProfileState, action) => ({
      ...state,
      favorites: action.favorites
    })
  ),
  on(
    clearProfileData,
    (state: ProfileState) => ({
      ...state,
      favorites: null,
      shoppingList: null
    })
  ),
  on(
    deleteFromFavorites,
    (state: ProfileState, action) => ({
      ...state,
      favorites: state.favorites.filter(favId => favId.id !== action.recipeId)
    })
  ),
  on(
    fetchShoppingListSuccess,
    (state: ProfileState, action) => ({
      ...state,
      shoppingList: action.ingredients
    })
  )
);

export function profileReducer(state: ProfileState | undefined, action: Action) {
  return reducer(state, action);
}
