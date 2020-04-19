import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth-guard.service';

// TODO move route names to constants
const authRouting: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [AuthGuard],
    children:
    [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
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
