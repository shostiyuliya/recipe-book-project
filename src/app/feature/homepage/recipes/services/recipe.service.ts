import { Injectable } from '@angular/core';
import { RecipeModel } from '../models/recipe.model';
import { addToShoppingList } from '../../../profile/state-management/profile.actions';
import { MatSnackBar } from '@angular/material';
import { RecipeDetailModel } from '../recipes-list/recipe-detail/models/recipe-detail.model';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipes: RecipeModel[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private store: Store<any>,
    private firebase: AngularFireAuth
  ) {
  }

  setRecipes(recipes: RecipeModel[]) {
    this.recipes = recipes;
  }

  getRecipes() {
    return this.recipes.slice();
  }

  transformSingleResponse(response: [{ meals: any }]) {
    return response.map(item => {
      return item.meals.map(recipe => {
        return {
          name: recipe.strMeal,
          imagePath: recipe.strMealThumb,
          id: recipe.idMeal
        } as RecipeModel;
      });
    });
  }

  transformMultipleResponses(response: [{ meals: any }]) {
    const responseArray = response.map(responseItem => responseItem.meals).reduce((a, b) => [...a, ...b]);
    const idArray = responseArray.map(recipeItem => recipeItem.idMeal);
    const arrMap = new Map();
    idArray.forEach(id => {
      arrMap.set(id, arrMap.has(id) ? arrMap.get(id) + 1 : 1);
    });
    const filteredIdArray = [];
    arrMap.forEach((value, key) => {
      if (value === Math.max(...arrMap.values())) {
        filteredIdArray.push(key);
      }
    });
    const filteredRecipes = filteredIdArray.map(id => responseArray.find(item => item.idMeal === id));
    return filteredRecipes.map(recipe => {
      return {
        name: recipe.strMeal,
        imagePath: recipe.strMealThumb,
        id: recipe.idMeal
      } as RecipeModel;
    });
  }

  addToShoppingList(recipe: RecipeDetailModel) {
    const user = this.firebase.auth.currentUser;
    if (user) {
      if (recipe.ingredients.some(ingredient => ingredient.selected)) {
        this.store.dispatch(addToShoppingList({
          ingredients: recipe.ingredients.filter(ingredient => ingredient.selected)
        }));
        this.snackBar.open('Ingredients added to shopping list', '', {
          duration: 2500
        });
      } else {
        this.snackBar.open('Please, select ingredients that you want to add!', '', {
          duration: 2500
        });
      }
    } else {
      this.snackBar.open('You are not authorized!', '', {
        duration: 2500
      });
    }
  }
}
