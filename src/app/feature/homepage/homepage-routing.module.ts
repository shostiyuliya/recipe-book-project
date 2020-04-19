import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { RecipeListComponent } from './recipes/recipes-list/recipe-list.component';
import { RecipesCompilationComponent } from './recipes-compilation/recipes-compilation.component';
import { RecipeResponseResolverService } from './recipes/services/recipe-response-resolver.service';
import { RecipeDetailComponent } from './recipes/recipes-list/recipe-detail/recipe-detail.component';
import { RecipeDetailResolverService } from './recipes/recipes-list/recipe-detail/services/recipe-detail-resolver.service';

// TODO move route names to constants
const homepageRouting: Routes = [
    {
      path: '', component: HomepageComponent, children: [
        {path: '', pathMatch: 'full', redirectTo: 'compilation'},
        {
          path: 'list',
          component: RecipeListComponent,
          runGuardsAndResolvers: 'paramsOrQueryParamsChange',
          resolve: {
            recipeResponse: RecipeResponseResolverService
          }
        },
        {
          path: 'recipe-detail',
          component: RecipeDetailComponent,
          runGuardsAndResolvers: 'paramsOrQueryParamsChange',
          // TODO see upper resolve code formatting. Check all the project
          resolve: {recipeDetailResponse: RecipeDetailResolverService}
        },
        {path: 'compilation', component: RecipesCompilationComponent}
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
