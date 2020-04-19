import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class RecipesCompilationService {

  readonly recipesCompilationData = [
    {
      imagePath: '/assets/thai.jpg',
      name: 'Thai',
      type: 'a'
    },
    {
      imagePath: '/assets/italian.jpg',
      name: 'Italian',
      type: 'a',
    },
    {
      imagePath: '/assets/breakfast.jpg',
      name: 'Breakfast',
      type: 'c'
    },
    {
      imagePath: '/assets/seafood.jpg',
      name: 'Seafood',
      type: 'c'
    },
    {
      imagePath: '/assets/vegetarian.jpg',
      name: 'Vegetarian',
      type: 'c'
    }
  ];
}
