import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeModel } from '../models/recipe.model';
import { Observable, Subscription } from 'rxjs';
import { getLoaderStatus } from '../../../../core/state-management/loader.selectors';
import { Store } from '@ngrx/store';
import { RoutesService } from '../../../../core/services/routes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  loader$: Observable<boolean> = this.store.select(getLoaderStatus);

  recipes: RecipeModel[] = [];

  recipesListTitle = '';

  recipeListChanged: Subscription;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<any>,
    private routesService: RoutesService
  ) {
  }

  ngOnInit(): void {
    this.recipeListChanged = this.route.data.subscribe(value => {
      this.recipesListTitle = this.route.snapshot.queryParams.searchValue;
      this.recipeService.setRecipes(value.recipeResponse);
      this.recipes = this.recipeService.getRecipes();
    });
  }

  onRecipeDetail(id: number) {
    this.router.navigate(
      [this.routesService.recipeDetails],
      {queryParams: {id}}
    );
  }

  trackById(index: number, recipe) {
    return recipe.id;
  }

  ngOnDestroy(): void {
    this.recipeListChanged.unsubscribe();
  }
}
