import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class ProfileGuard implements CanActivate {

  constructor(private router: Router, private firebase: AngularFireAuth) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.firebase.authState.pipe(
      take(1),
      map(user => {
        if (!!user) {
          return true;
        }
        return this.router.createUrlTree(['/auth/login']);
      })
    );
  }

}
