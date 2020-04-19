import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { RecipeModel } from '../../../homepage/recipes/models/recipe.model';
import { getFavorites } from '../../state-management/profile.selectors';
import { getLoaderStatus } from '../../../../core/state-management/loader.selectors';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent implements OnInit {

  favorites$: Observable<RecipeModel[]> = this.store.select(getFavorites);

  loader$: Observable<boolean> = this.store.select(getLoaderStatus);

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }
}
