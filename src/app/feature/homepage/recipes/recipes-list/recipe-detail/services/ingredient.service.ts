import { Injectable } from '@angular/core';
import { IngredientModel } from '../models/ingredient.model';
import { RecipeItemResponseModel } from '../../../models/recipe-item-response.model';

@Injectable({providedIn: 'root'})
export class IngredientService {

  setIngredients(recipeResponse: RecipeItemResponseModel) {
    const ingredientNames = this.transformIngredientsResponse(recipeResponse, 'strIngredient');
    const ingredientAmount = this.transformIngredientsResponse(recipeResponse, 'strMeasure');
    return ingredientNames.map((value, index) => {
      return {
        name: value,
        amount: ingredientAmount[index]
      } as IngredientModel;
    });
  }

  private transformIngredientsResponse(recipeResponse: RecipeItemResponseModel, strName: string) {
    const values = [];
    let count = 1;
    for (const prop in recipeResponse) {
      if (prop === strName + count && recipeResponse[prop] !== '' && recipeResponse[prop] !== ' ' && recipeResponse[prop] !== null) {
        count++;
        values.push(recipeResponse[prop]);
      }
    }
    return values;
  }
}
