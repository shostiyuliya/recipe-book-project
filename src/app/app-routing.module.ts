import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// TODO create routes paths constants file and use it here
const appRoutes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./feature/homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./feature/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./feature/profile/profile.module').then(m => m.ProfileModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
