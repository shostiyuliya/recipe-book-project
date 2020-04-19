import { IngredientModel } from './ingredient.model';

export interface RecipeDetailModel {
  name: string;
  imagePath: string;
  id: number;
  category: string;
  area: string;
  instructions: string;
  ingredients: IngredientModel[];
}
