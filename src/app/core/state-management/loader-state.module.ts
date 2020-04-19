import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { loaderReducer, loaderStorageName } from './loader.reducer';

@NgModule({
  imports: [
    EffectsModule.forFeature([

    ]),
    StoreModule.forFeature(loaderStorageName, loaderReducer)
  ]
})

export class LoaderStateModule {

}
