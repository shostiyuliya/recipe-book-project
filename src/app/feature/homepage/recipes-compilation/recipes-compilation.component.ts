import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesCompilationService } from './services/recipes-compilation.service';

@Component({
  selector: 'app-recipes-compilation',
  templateUrl: './recipes-compilation.component.html',
  styleUrls: ['./recipes-compilation.component.css']
})
export class RecipesCompilationComponent implements OnInit {
  recipesCompilationData = [];

  constructor(private router: Router, private recipesCompilationService: RecipesCompilationService) {}

  ngOnInit(): void {
    this.recipesCompilationData = this.recipesCompilationService.recipesCompilationData;
  }

  onRecipeCompilation(compilationName: string, compilationType: string) {
    if (compilationType === 'a') {
      this.router.navigate(['/home', 'list'], {queryParams: {areaValue: compilationName}});
    } else {
      this.router.navigate(['/home', 'list'], {queryParams: {categoryValue: compilationName}});
    }
  }
}
