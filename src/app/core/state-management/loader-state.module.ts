import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { loaderReducer, loaderStorageName } from './loader.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(loaderStorageName, loaderReducer)
  ]
})

export class LoaderStateModule {

}
