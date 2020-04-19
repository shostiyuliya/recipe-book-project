import { Component, Input } from '@angular/core';
import { RecipeModel } from '../../../homepage/recipes/models/recipe.model';
import { UserModel } from '../../../auth/models/user.model';
import { ProfileService } from '../../services/profile.service';
import { Store } from '@ngrx/store';
import { deleteFromFavorites } from '../../state-management/profile.actions';
import { Router } from '@angular/router';
import { RoutesService } from '../../../../core/services/routes.service';

@Component({
  selector: 'app-favorite-recipe-item',
  templateUrl: './favorite-recipe-item.component.html',
  styleUrls: ['./favorite-recipe-item.component.css']
})
export class FavoriteRecipeItemComponent {

  @Input() recipe: RecipeModel;

  @Input() userData: UserModel;

  constructor(
    private profileService: ProfileService,
    private store: Store<any>,
    private router: Router,
    private routesService: RoutesService
  ) { }

  onDeleteFromFavorites() {
    this.store.dispatch(deleteFromFavorites({
      recipeId: this.recipe.id
    }));
  }

  onFavoriteRecipeDetail(id: number) {
    this.router.navigate([this.routesService.favoritesRecipeDetails], {queryParams: {id}});
  }

}
