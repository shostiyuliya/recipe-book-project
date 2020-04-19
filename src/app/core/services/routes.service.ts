import { Injectable } from '@angular/core';
import { routeNames } from '../consts/route-names';

@Injectable({
  providedIn: 'root'
})

export class RoutesService {

  private readonly routes = {
    homepage: `/${routeNames.home}/${routeNames.compilations}`,
    favoritesList: `/${routeNames.profile}/${routeNames.favorites}/${routeNames.favoritesList}`,
    favoritesRecipeDetails: `/${routeNames.profile}/${routeNames.favorites}/${routeNames.favoritesRecipeDetails}`,
    shoppingList: `/${routeNames.profile}/${routeNames.shoppingList}`,
    searchResults: `/${routeNames.home}/${routeNames.recipeList}`,
    recipeDetails: `/${routeNames.home}/${routeNames.recipeDetails}`,
    login: `/${routeNames.auth}/${routeNames.login}`,
    signup: `/${routeNames.auth}/${routeNames.signUp}`
  };

  get homepage() {
    return this.routes.homepage;
  }

  get favoritesList() {
    return this.routes.favoritesList;
  }

  get favoritesRecipeDetails() {
    return this.routes.favoritesRecipeDetails;
  }

  get shoppingList() {
    return this.routes.shoppingList;
  }

  get recipeListResults() {
    return this.routes.searchResults;
  }

  get recipeDetails() {
    return this.routes.recipeDetails;
  }

  get login() {
    return this.routes.login;
  }

  get signup() {
    return this.routes.signup;
  }
}
