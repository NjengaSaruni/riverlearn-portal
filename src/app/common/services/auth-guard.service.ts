/**
 * Created by saruni on 8/23/17.
 */

import { Injectable }     from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot}    from '@angular/router';

import {CommonService} from './common.service';
import {UserService} from './user.service';

@Injectable()
export class AuthGuard extends CommonService  implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.isLoggedIn) { return true; }
    // TODO: ensure loaded module contains required user.

    // Navigate to the login page with extras
    this.router.navigate(['/login-page'], { queryParams: { url: url } } );
  }

}

@Injectable()
export class AdminGuard extends UserService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = route.url.toString();
    return this.checkIsAdmin(url);
  }

  checkIsAdmin(url: string) : boolean {
    return this.fetchLoggedInUser().is_admin
  }
}
