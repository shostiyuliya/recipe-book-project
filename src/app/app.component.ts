import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAccountDetails } from './feature/auth/state-management/auth.selectors';
import { logout } from './feature/auth/state-management/auth.actions';
import { Router } from '@angular/router';
import { UserModel } from './feature/auth/models/user.model';
import { AuthService } from './feature/auth/services/auth.service';
import { clearProfileData } from './feature/profile/state-management/profile.actions';
import { RoutesService } from './core/services/routes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  readonly user$: Observable<UserModel> = this.store.select(getAccountDetails);

  constructor(
    private store: Store<any>,
    private router: Router,
    private authService: AuthService,
    private routesService: RoutesService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }

  onLogout() {
    this.store.dispatch(logout());
    this.store.dispatch(clearProfileData());
    this.router.navigate([this.routesService.homepage]);

    // TODO create local storage service for that. Move keys to constants
    localStorage.removeItem('userData');
  }

  onFavorites() {
    this.router.navigate([this.routesService.favoritesList]);
  }

  onShoppingLists() {
    this.router.navigate([this.routesService.shoppingList]);
  }
}
