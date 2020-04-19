import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites/favorites.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { FavoriteRecipeItemComponent } from './favorites/favorite-recipe-item/favorite-recipe-item.component';
import { FavoritesRecipeDetailComponent } from './favorites/favorites-recipe-detail/favorites-recipe-detail.component';
import { FavoritesListComponent } from './favorites/favorites-list/favorites-list.component';


@NgModule({
  declarations: [
    FavoritesComponent,
    ShoppingListComponent,
    ProfileComponent,
    FavoriteRecipeItemComponent,
    FavoritesRecipeDetailComponent,
    FavoritesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
