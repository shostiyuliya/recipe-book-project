import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IngredientModel } from '../../../feature/homepage/recipes/recipes-list/recipe-detail/models/ingredient.model';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngredientComponent {

  @Input() ingredients: IngredientModel[];

  onSelect(ingredient: IngredientModel) {
    ingredient.selected = !ingredient.selected;
  }
}
