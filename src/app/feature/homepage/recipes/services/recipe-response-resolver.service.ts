import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of, zip } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, tap } from 'rxjs/operators';
import { SearchService } from '../../search/search.service';
import { RecipeService } from './recipe.service';
import { RecipeModel } from '../models/recipe.model';

@Injectable({providedIn: 'root'})
export class RecipeResponseResolverService implements Resolve<RecipeModel> {

  observables$ = [];

  constructor(private http: HttpClient, private searchService: SearchService, private recipeService: RecipeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<RecipeModel>
    | Promise<RecipeModel>
    | RecipeModel {
    if (route.queryParams.areaValue) {
      this.observables$.push(this.searchService.getArea(route.queryParams.areaValue));
    }
    if (route.queryParams.categoryValue) {
      this.observables$.push(this.searchService.getCategory(route.queryParams.categoryValue));
    }
    if (route.queryParams.nameValue) {
      this.observables$.push(this.searchService.getName(route.queryParams.nameValue));
    }
    return zip(...this.observables$)
      .pipe(
        mergeMap((response: [{meals: any}]) => {
          if (response.length < 2) {
            return this.recipeService.transformSingleResponse(response);
          } else {
            return of(this.recipeService.transformMultipleResponses(response));
          }
        }),
        tap(() => {
          this.observables$ = [];
        })
      );
  }
}
