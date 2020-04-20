import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeDetailModel } from './models/recipe-detail.model';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IngredientService } from './services/ingredient.service';
import { Store } from '@ngrx/store';
import { addToFavorites } from '../../../../profile/state-management/profile.actions';
import { MatSnackBar } from '@angular/material';
import { getFavorites } from '../../../../profile/state-management/profile.selectors';
import { take, takeUntil } from 'rxjs/operators';
import { RecipeModel } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: 'recipe-detail.component.html',
  styleUrls: ['recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  favorites$: Observable<RecipeModel[]> = this.store.select(getFavorites);

  recipe: RecipeDetailModel;

  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private ingredientService: IngredientService,
    private store: Store<any>,
    private snackBar: MatSnackBar,
    private recipeService: RecipeService,
    private firebase: AngularFireAuth
  ) {
  }

  onFavorites() {
    const user = this.firebase.auth.currentUser;
    if (user) {
      this.favorites$.pipe(take(1)).subscribe((favorites: RecipeModel[]) => {
        if (!favorites) {
          favorites = [];
        }
        if (favorites.some(id => id.id === this.recipe.id)) {
          this.snackBar.open('You already have this recipe in favorites', '', {
            duration: 2500
          });
        } else {
          this.store.dispatch(addToFavorites({recipeId: this.recipe.id}));
          this.snackBar.open('Recipe added to your favorites.', '', {
            duration: 2500
          });
        }
      });
    } else {
      this.snackBar.open('You are not authorized!', '', {
        duration: 2500
      });
    }
  }

  ngOnInit(): void {
    this.route.data
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value: { recipeDetailResponse: RecipeDetailModel[] }) => {
        value.recipeDetailResponse.forEach((recipe: RecipeDetailModel) => {
          this.recipe = recipe;
        });
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onAddToShoppingList() {
    this.recipeService.addToShoppingList(this.recipe);
  }
}
