import { Component, Input, OnInit } from '@angular/core';
import { IngredientModel } from '../../../feature/homepage/recipes/recipes-list/recipe-detail/models/ingredient.model';

// TODO try to add change detection strategy OnPush for components. Remove CSS file if not used

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  @Input() ingredients: IngredientModel[];

  // TODO remove
  ngOnInit() {
  }

  onSelect(ingredient: IngredientModel) {
    ingredient.selected = !ingredient.selected;
  }
}
