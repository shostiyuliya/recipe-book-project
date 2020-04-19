import { NgModule } from '@angular/core';
import { HomepageComponent } from './homepage.component';
import { SharedModule } from '../../shared/shared.module';
import { HomepageRoutingModule } from './homepage-routing.module';
import { RecipesCompilationComponent } from './recipes-compilation/recipes-compilation.component';
import { SearchComponent } from './search/search.component';
import { RecipeListComponent } from './recipes/recipes-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipes-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipes-list/recipe-detail/recipe-detail.component';

@NgModule({
  declarations: [
    HomepageComponent,
    RecipesCompilationComponent,
    SearchComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent
  ],
  imports: [
    SharedModule,
    HomepageRoutingModule
  ]
})
export class HomepageModule {}
