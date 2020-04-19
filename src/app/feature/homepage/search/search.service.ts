import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeResponseModel } from '../recipes/models/recipe-response.model';
import { RecipeItemResponseModel } from '../recipes/models/recipe-item-response.model';
import { recipesApiUrls } from '../consts/recipes-api-urls';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  getArea(searchValue: string) {
    return this.http.get<RecipeResponseModel>(recipesApiUrls.searchByArea + searchValue);
  }

  getCategory(searchValue: string) {
    return this.http.get<RecipeResponseModel>(recipesApiUrls.searchByCategory + searchValue);
  }

  getName(searchValue: string) {
    return this.http.get<RecipeItemResponseModel>(recipesApiUrls.searchByName + searchValue);
  }
}
