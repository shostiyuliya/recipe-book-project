import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesService } from '../../core/services/routes.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(
    private router: Router,
    private routesService: RoutesService
  ) {
  }

  onFavoritesTab() {
    this.router.navigate([this.routesService.favoritesList]);
  }

  onShoppingListsTab() {
    this.router.navigate([this.routesService.shoppingList]);
  }
}
