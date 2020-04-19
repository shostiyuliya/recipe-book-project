import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeNames } from './core/consts/route-names';

const appRoutes: Routes = [
  {
    path: '', redirectTo: routeNames.home, pathMatch: 'full'
  },
  {
    path: routeNames.home,
    loadChildren: () => import('./feature/homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: routeNames.auth,
    loadChildren: () => import('./feature/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: routeNames.profile,
    loadChildren: () => import('./feature/profile/profile.module').then(m => m.ProfileModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
