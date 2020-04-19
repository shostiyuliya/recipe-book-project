import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RecipeItemResponseModel } from '../../../models/recipe-item-response.model';
import { map } from 'rxjs/operators';
import { RecipeDetailModel } from '../models/recipe-detail.model';
import { IngredientService } from './ingredient.service';
import { recipesApiUrls } from '../../../../consts/recipes-api-urls';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailResolverService implements Resolve<RecipeDetailModel[]> {

  constructor(
    private http: HttpClient,
    private ingredientService: IngredientService
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<RecipeDetailModel[]>
    | Promise<RecipeDetailModel[]>
    | RecipeDetailModel[] {
    return this.http.get<{ meals: RecipeItemResponseModel[] }>(recipesApiUrls.searchById + route.queryParams.id)
      .pipe(
        map((response: { meals: RecipeItemResponseModel[] }) => {
          return response.meals.map((recipe: RecipeItemResponseModel) => {
            return {
              name: recipe.strMeal,
              id: +recipe.idMeal,
              imagePath: recipe.strMealThumb,
              category: recipe.strCategory,
              area: recipe.strArea,
              instructions: recipe.strInstructions,
              ingredients: this.ingredientService.setIngredients(recipe)
            } as RecipeDetailModel;
          });
        })
      );
  }
}
