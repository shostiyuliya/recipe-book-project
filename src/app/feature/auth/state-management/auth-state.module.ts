import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { authReducer, authStorageName } from './auth.reducer';

@NgModule({
  imports: [
    EffectsModule.forFeature([
      AuthEffects
    ]),
    StoreModule.forFeature(authStorageName, authReducer)
  ]
})
export class AuthStateModule {
}
