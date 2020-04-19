import { Component, OnDestroy, OnInit } from '@angular/core';
import { IngredientModel } from '../../homepage/recipes/recipes-list/recipe-detail/models/ingredient.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { getShoppingList } from '../state-management/profile.selectors';
import { deleteIngredientFromShoppingList } from '../state-management/profile.actions';
import { getLoaderStatus } from '../../../core/state-management/loader.selectors';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  loader$: Observable<boolean> = this.store.select(getLoaderStatus);

  shoppingList$: Observable<IngredientModel[]> = this.store.select(getShoppingList);

  shoppingListSubs: Subscription;

  shoppingList: IngredientModel[];

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.shoppingListSubs = this.shoppingList$.subscribe(ingredients => {
      this.shoppingList = ingredients;
    });
  }

  ngOnDestroy(): void {
    this.shoppingListSubs.unsubscribe();
  }

  onDeleteIngredient(index: number) {
    this.store.dispatch(deleteIngredientFromShoppingList({
      ingredientIndex: index
    }));
  }
}
