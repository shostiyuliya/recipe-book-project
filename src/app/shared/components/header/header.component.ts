import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UserModel } from '../../../feature/auth/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  @Input()
  accountDetails: UserModel;

  @Output()
  logout = new EventEmitter<void>();

  @Output()
  favorites = new EventEmitter<void>();

  @Output()
  shoppingLists = new EventEmitter<void>();

  onLogout() {
    this.logout.emit();
  }

  onFavorites() {
    this.favorites.emit();
  }

  onShoppingLists() {
    this.shoppingLists.emit();
  }
}
