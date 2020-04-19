import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesRecipeDetailComponent } from './favorites/favorites-recipe-detail/favorites-recipe-detail.component';
import { FavoritesListComponent } from './favorites/favorites-list/favorites-list.component';
import { RecipeDetailResolverService } from '../homepage/recipes/recipes-list/recipe-detail/services/recipe-detail-resolver.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProfileGuard } from './profile.guard';
import { routeNames } from '../../core/consts/route-names';

const profileRouting: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [ProfileGuard],
    children:
      [
        {
          path: routeNames.favorites,
          component: FavoritesComponent,
          children:
            [
              {
                path: routeNames.favoritesList,
                component: FavoritesListComponent
              },
              {
                path: routeNames.favoritesRecipeDetails,
                component: FavoritesRecipeDetailComponent,
                resolve: {
                  recipeDetail: RecipeDetailResolverService
                }
              }
            ]
        },
        {
          path: routeNames.shoppingList,
          component: ShoppingListComponent
        }
      ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(profileRouting)
  ],
  exports: [
    RouterModule
  ]
})

export class ProfileRoutingModule {

}
