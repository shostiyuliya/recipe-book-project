import { Injectable } from '@angular/core';
import { IngredientModel } from '../models/ingredient.model';
import { RecipeItemResponseModel } from '../../../models/recipe-item-response.model';

@Injectable({
  providedIn: 'root'
})
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
    const recipeItem = recipeResponse.meals[0];
    const values = [];
    let count = 1;
    for (const prop in recipeItem) {
      if (prop === strName + count && recipeItem[prop] !== '' && recipeItem[prop] !== ' ' && recipeItem[prop] !== null) {
        count++;
        values.push(recipeItem[prop]);
      }
    }
    return values;
  }
}
