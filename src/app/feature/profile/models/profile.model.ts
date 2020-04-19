import { RecipeModel } from '../../homepage/recipes/models/recipe.model';

export interface ProfileModel {
  id: string;
  favorites: RecipeModel [];
}
