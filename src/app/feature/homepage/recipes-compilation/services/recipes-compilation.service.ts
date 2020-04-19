import { Injectable } from '@angular/core';
import { searchTypes } from '../../consts/search-types';

@Injectable({
  providedIn: 'root'
})
export class RecipesCompilationService {

  readonly recipesCompilationData = [
    {
      imagePath: '/assets/thai.jpg',
      name: 'Thai',
      searchType: searchTypes.area
    },
    {
      imagePath: '/assets/italian.jpg',
      name: 'Italian',
      searchType: searchTypes.area
    },
    {
      imagePath: '/assets/breakfast.jpg',
      name: 'Breakfast',
      searchType: searchTypes.category
    },
    {
      imagePath: '/assets/seafood.jpg',
      name: 'Seafood',
      searchType: searchTypes.category
    },
    {
      imagePath: '/assets/vegetarian.jpg',
      name: 'Vegetarian',
      searchType: searchTypes.category
    }
  ];
}
