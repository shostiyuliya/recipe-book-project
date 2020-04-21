import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeDetailModel } from '../../../homepage/recipes/recipes-list/recipe-detail/models/recipe-detail.model';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { DetailResolverDataModel } from '../../models/detail-resolver-data.model';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { RecipeService } from '../../../homepage/recipes/services/recipe.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-favorites-recipe-detail',
  templateUrl: './favorites-recipe-detail.component.html',
  styleUrls: ['./favorites-recipe-detail.component.css']
})
export class FavoritesRecipeDetailComponent implements OnInit, OnDestroy {

  unsubscribe$: Subject<void> = new Subject<void>();

  recipe: RecipeDetailModel;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private store: Store<any>,
    private recipeService: RecipeService
  ) {
  }

  ngOnInit() {
    this.route.data
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((favoritesRecipe: DetailResolverDataModel) => {
        favoritesRecipe.recipeDetail.forEach((recipe: RecipeDetailModel) => {
          this.recipe = recipe;
        });
      });
  }

  onAddToShoppingList() {
    this.recipeService.addToShoppingList(this.recipe);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
