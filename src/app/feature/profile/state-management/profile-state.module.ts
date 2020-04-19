import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { profileReducer, profileStorageName } from './profile.reducer';
import { ProfileEffects } from './profile.effects';

@NgModule({
  imports: [
    EffectsModule.forFeature([
      ProfileEffects
    ]),
    StoreModule.forFeature(profileStorageName, profileReducer)
  ]
})

export class ProfileStateModule {

}
