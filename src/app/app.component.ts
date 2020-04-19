import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAccountDetails } from './feature/auth/state-management/auth.selectors';
import { logout } from './feature/auth/state-management/auth.actions';
import { Router } from '@angular/router';
import { UserModel } from './feature/auth/models/user.model';
import { AuthService } from './feature/auth/services/auth.service';
import { clearProfileData } from './feature/profile/state-management/profile.actions';
import { ProfileService } from './feature/profile/services/profile.service';

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

    // TODO remove unused import
    private profileService: ProfileService
  ) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }

  onLogout() {
    this.store.dispatch(logout());
    this.store.dispatch(clearProfileData());

    // TODO create some service that will contain all the routes. Create constants for routes parts
    this.router.navigate(['/home']);

    // TODO create local storage service for that. Move keys to constants
    localStorage.removeItem('userData');
  }

  // TODO routes service.
  onFavorites() {
    this.router.navigate(['/profile/favorites/list']);
  }

  onShoppingLists() {
    this.router.navigate(['/profile/shopping-list']);
  }
}
