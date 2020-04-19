import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { concatMap, map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { fetchFavoritesId, fetchShoppingList } from '../state-management/profile.actions';
import { IngredientModel } from '../../homepage/recipes/recipes-list/recipe-detail/models/ingredient.model';
import { fromPromise } from 'rxjs/internal-compatibility';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProfileService {

  shoppingListCollection = this.firestore.collection('shopping-lists');

  constructor(
    private firestore: AngularFirestore,
    private store: Store<any>
  ) {}

  addToShoppingList(ingredients: IngredientModel[], userId: string) {
    return this.getUserShoppingList(userId)
      .pipe(
        concatMap(docs => {
          if (!docs.length) {
            return [fromPromise(this.shoppingListCollection.add({ingredients, userId}))];
          } else {
            return this.updateShoppingList(userId, ingredients);
          }
        })
      );
  }

  updateShoppingList(userId: string, ingredients: IngredientModel[], onDeleteIngredientIndex?: number) {
    return this.fetchShoppingList(userId).pipe(
      tap(response => {
        const ingredientsMapped = response[0].ingredients.map(ingredient => {
          return {
            name: ingredient.name,
            amount: ingredient.amount
          } as IngredientModel;
        });
        if (onDeleteIngredientIndex >= 0) {
          this.shoppingListCollection.doc(response[0].docId).update({
            ingredients: ingredients.filter((ingredient, index) => index !== onDeleteIngredientIndex)
          });
        } else {
          this.shoppingListCollection.doc(response[0].docId).update({
            ingredients: [...ingredients, ...ingredientsMapped]
          });
        }
      })
    );
  }

  fetchShoppingList(userId: string) {
    return this.firestore.collection('shopping-lists', ref => ref.where('userId', '==', userId))
      .get()
      .pipe(
        concatMap(querySnapshot => {
          return of(
            querySnapshot.docs.map(doc => {
              return {
                ingredients: doc.data().ingredients,
                docId: doc.id
              };
            })
          );
        })
      );
  }

  addToFavorites(userId: string, recipeId: number) {
    this.firestore
      .collection('favorites')
      .add({userId, recipeId});
  }

  fetchFavoritesId(userId: string) {
    return this.firestore
      .collection('favorites', ref => ref.where('userId', '==', userId))
      .get()
      .pipe(
        map(querySnapshot => {
          return querySnapshot.docs.map(doc => {
            return doc.data().recipeId;
          });
        })
      );
  }

  loadProfileData(id: string) {
    this.store.dispatch(fetchFavoritesId({
      userId: id
    }));
    this.store.dispatch(fetchShoppingList({
      userId: id
    }));
  }

  deleteFromFavorites(recipeId: number, userId: string) {
     return this.getFavoritesFirebaseDocId(recipeId, userId)
       .pipe(
         tap(docId => {
           docId.forEach(id => {
             this.firestore.collection('favorites').doc(id).delete();
           });
         })
       );
  }

  private getFavoritesFirebaseDocId(recipeId: number, userId: string) {
    return this.firestore.collection(
      'favorites', ref => ref
        .where('recipeId', '==', recipeId)
        .where('userId', '==', userId)
    )
      .get()
      .pipe(
        map(querySnapshot => {
          return querySnapshot.docs.map(doc => {
            return doc.id;
          });
        })
      );
  }

  private getUserShoppingList(userId: string) {
    return this.firestore.collection('shopping-lists', ref => ref.where('userId', '==', userId))
      .get()
      .pipe(
        map(querySnapshot => {
          return querySnapshot.docs;
        })
      );
  }
}

