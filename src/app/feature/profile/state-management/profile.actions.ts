import { createAction, props } from '@ngrx/store';
import { RecipeModel } from '../../homepage/recipes/models/recipe.model';
import { IngredientModel } from '../../homepage/recipes/recipes-list/recipe-detail/models/ingredient.model';

export enum ProfileActionsTypes {
  AddToFavorites = '[FAVORITES] Add to favorites',
  FetchFavoritesId = '[FAVORITES] Fetch favorites Id',
  FetchFavoritesRecipes = '[FAVORITES] Fetch favorites recipes',
  ClearProfileData = '[FAVORITES] Clear profile data',
  DeleteFromFavorites = '[FAVORITES] Delete from favorites',
  AddToShoppingList = '[SHOPPING LIST] Add to Shopping list',
  FetchShoppingList = '[SHOPPING LIST] Fetch shopping list',
  FetchShoppingListSuccess = '[SHOPPING LIST] Fetch shopping list success',
  DeleteIngredientFromShoppingList = '[SHOPPING LIST] Delete ingredient from shopping list'
}

export const addToFavorites = createAction(
  ProfileActionsTypes.AddToFavorites,
  props<{
    recipeId: number
  }>()
);

export const fetchFavoritesId = createAction(
  ProfileActionsTypes.FetchFavoritesId,
  props<{
    userId: string
  }>()
);

export const fetchFavoritesRecipes = createAction(
  ProfileActionsTypes.FetchFavoritesRecipes,
  props<{
    favorites: RecipeModel[]
  }>()
);

export const clearProfileData = createAction(
  ProfileActionsTypes.ClearProfileData
);

export const deleteFromFavorites = createAction(
  ProfileActionsTypes.DeleteFromFavorites,
  props<{
    recipeId: number
  }>()
);

export const addToShoppingList = createAction(
  ProfileActionsTypes.AddToShoppingList,
  props<{
    ingredients: IngredientModel[]
  }>()
);

export const fetchShoppingList = createAction(
  ProfileActionsTypes.FetchShoppingList,
  props<{
    userId: string
  }>()
);

export const fetchShoppingListSuccess = createAction(
  ProfileActionsTypes.FetchShoppingListSuccess,
  props<{
    ingredients: IngredientModel[]
  }>()
);

export const deleteIngredientFromShoppingList = createAction(
  ProfileActionsTypes.DeleteIngredientFromShoppingList,
  props<{
    ingredientIndex: number
  }>()
);
