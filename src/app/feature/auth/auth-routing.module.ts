import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth-guard.service';
import { routeNames } from '../../core/consts/route-names';

const authRouting: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [AuthGuard],
    children:
      [
        {
          path: routeNames.login,
          component: LoginComponent
        },
        {
          path: routeNames.signUp,
          component: SignupComponent
        }
      ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(authRouting)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {
}
