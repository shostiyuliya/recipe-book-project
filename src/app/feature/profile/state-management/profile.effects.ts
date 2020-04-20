import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  addToFavorites,
  addToShoppingList,
  deleteFromFavorites,
  deleteIngredientFromShoppingList,
  fetchFavoritesId,
  fetchFavoritesRecipes,
  fetchShoppingList,
  fetchShoppingListSuccess
} from './profile.actions';
import { concatMap, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getAccountDetails } from '../../auth/state-management/auth.selectors';
import { UserModel } from '../../auth/models/user.model';
import { ProfileService } from '../services/profile.service';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { RecipeModel } from '../../homepage/recipes/models/recipe.model';
import { IngredientModel } from '../../homepage/recipes/recipes-list/recipe-detail/models/ingredient.model';
import { getShoppingList } from './profile.selectors';
import { loadingFinished, loadingStarts } from '../../../core/state-management/loader.actions';
import { recipesApiUrls } from '../../homepage/consts/recipes-api-urls';

@Injectable()
export class ProfileEffects {

  @Effect()
  addToFavoritesAction$ = this.actions$.pipe(
    ofType(addToFavorites),
    withLatestFrom(this.store.select(getAccountDetails)),
    switchMap(([action, accountDetails]: [any, UserModel]) => {
      const {recipeId} = action;
      this.profileService.addToFavorites(accountDetails.id, recipeId);
      return [
        fetchFavoritesId({
          userId: accountDetails.id
        })
      ];
    })
  );

  @Effect()
  fetchFavoritesId$ = this.actions$.pipe(
    ofType(fetchFavoritesId),
    switchMap((action: any) => {
      this.store.dispatch(loadingStarts());
      const {userId} = action;
      return this.profileService.fetchFavoritesId(userId).pipe(
        concatMap(ids => {
          const responses = ids.map(id => {
            return this.http.get<{ meals: any }>(recipesApiUrls.searchById + id).pipe(
              map(response => {
                return response.meals[0];
              })
            );
          });
          return zip(...responses).pipe(
            mergeMap(recipeResponses => {
              this.store.dispatch(loadingFinished());
              const mappedItems = recipeResponses.map(recipe => {
                return {
                  name: recipe.strMeal,
                  id: +recipe.idMeal,
                  imagePath: recipe.strMealThumb + '/preview'
                } as RecipeModel;
              });
              return [
                fetchFavoritesRecipes({
                  favorites: mappedItems
                })
              ];
            })
          );
        })
      );
    })
  );

  @Effect()
  deleteFromFavorites$ = this.actions$.pipe(
    ofType(deleteFromFavorites),
    withLatestFrom(this.store.select(getAccountDetails)),
    switchMap(([action, accountDetails]: [any, UserModel]) => {
      const {recipeId} = action;
      return this.profileService.deleteFromFavorites(recipeId, accountDetails.id).pipe(
        concatMap(() => {
          return [
            fetchFavoritesId({
              userId: accountDetails.id
            })
          ];
        })
      );
    })
  );

  @Effect()
  addToShoppingList$ = this.actions$.pipe(
    ofType(addToShoppingList),
    withLatestFrom(this.store.select(getAccountDetails)),
    switchMap(([action, accountDetails]: [any, UserModel]) => {
      const {ingredients} = action;
      return this.profileService.addToShoppingList(ingredients, accountDetails.id).pipe(
        concatMap(() => {
          return [
            fetchShoppingList({
              userId: accountDetails.id
            })
          ];
        })
      );
    })
  );

  @Effect()
  fetchShoppingList$ = this.actions$.pipe(
    ofType(fetchShoppingList),
    switchMap((action: any) => {
      this.store.dispatch(loadingStarts());
      const {userId} = action;
      return this.profileService.fetchShoppingList(userId)
        .pipe(
          concatMap(response => {
            const mappedIngredients = response.map(shoppingListDoc => {
              return shoppingListDoc.ingredients.map(ingredient => {
                return {
                  name: ingredient.name,
                  amount: ingredient.amount
                } as IngredientModel;
              });
            });
            this.store.dispatch(loadingFinished());
            return [
              fetchShoppingListSuccess({
                ingredients: mappedIngredients[0]
              })
            ];
          }));
    })
  );

  @Effect()
  deleteIngredientFormShoppingList$ = this.actions$.pipe(
    ofType(deleteIngredientFromShoppingList),
    withLatestFrom(this.store.select(getAccountDetails), this.store.select(getShoppingList)),
    switchMap(([action, accountDetails, shoppingList]: [any, UserModel, IngredientModel[]]) => {
      const {ingredientIndex} = action;
      return this.profileService.updateShoppingList(accountDetails.id, shoppingList, ingredientIndex).pipe(
        concatMap(() => {
          return [
            fetchShoppingList({
              userId: accountDetails.id
            })
          ];
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private store: Store<any>,
    private http: HttpClient
  ) {
  }
}
