import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { RecipeListComponent } from './recipes/recipes-list/recipe-list.component';
import { RecipesCompilationComponent } from './recipes-compilation/recipes-compilation.component';
import { RecipeResponseResolverService } from './recipes/services/recipe-response-resolver.service';
import { RecipeDetailComponent } from './recipes/recipes-list/recipe-detail/recipe-detail.component';
import { RecipeDetailResolverService } from './recipes/recipes-list/recipe-detail/services/recipe-detail-resolver.service';
import { routeNames } from '../../core/consts/route-names';

const homepageRouting: Routes = [
    {
      path: '',
      component: HomepageComponent,
      children: [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: routeNames.compilations
        },
        {
          path: routeNames.recipeList,
          component: RecipeListComponent,
          runGuardsAndResolvers: 'paramsOrQueryParamsChange',
          resolve: {
            recipeResponse: RecipeResponseResolverService
          }
        },
        {
          path: routeNames.recipeDetails,
          component: RecipeDetailComponent,
          runGuardsAndResolvers: 'paramsOrQueryParamsChange',
          resolve: {
            recipeDetailResponse: RecipeDetailResolverService
          }
        },
        {
          path: routeNames.compilations,
          component: RecipesCompilationComponent
        }
      ]
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(homepageRouting)
  ],
  exports: [
    RouterModule
  ]
})
export class HomepageRoutingModule {
}
