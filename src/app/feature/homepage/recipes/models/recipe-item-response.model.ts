const STR_INGREDIENT = 'strIngredient';
const STR_MEASURE = 'strMeasure';

export interface RecipeItemResponseModel {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: any;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  [STR_INGREDIENT]?: any;
  [STR_MEASURE]?: any;
  strSource?: any;
  dateModified?: any;
}
