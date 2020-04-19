import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../consts';
import { RecipeResponseModel } from '../recipes/models/recipe-response.model';
import { RecipeItemResponseModel } from '../recipes/models/recipe-item-response.model';

// TODO bad object formatting
@Injectable({providedIn: 'root'})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  getArea(searchValue: string) {
    return this.http.get<RecipeResponseModel>(url.areaSearch + searchValue);
  }

  getCategory(searchValue: string) {
    return this.http.get<RecipeResponseModel>(url.categorySearch + searchValue);
  }

  getName(searchValue: string) {
    return this.http.get<RecipeItemResponseModel>(url.nameSearch + searchValue);
  }
}
