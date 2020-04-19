import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesCompilationService } from './services/recipes-compilation.service';
import { searchTypes } from '../consts/search-types';
import { RoutesService } from '../../../core/services/routes.service';

@Component({
  selector: 'app-recipes-compilation',
  templateUrl: './recipes-compilation.component.html',
  styleUrls: ['./recipes-compilation.component.css']
})
export class RecipesCompilationComponent implements OnInit {

  recipesCompilationData = [];

  constructor(
    private router: Router,
    private recipesCompilationService: RecipesCompilationService,
    private routesService: RoutesService
  ) {
  }

  ngOnInit(): void {
    this.recipesCompilationData = this.recipesCompilationService.recipesCompilationData;
  }

  onRecipeCompilation(compilationName: string, compilationType: string) {
    if (compilationType === searchTypes.area) {
      this.router.navigate(
        [this.routesService.recipeListResults],
        {queryParams: {areaValue: compilationName}}
        );
    } else {
      this.router.navigate(
        [this.routesService.recipeListResults],
        {queryParams: {categoryValue: compilationName}}
        );
    }
  }
}
