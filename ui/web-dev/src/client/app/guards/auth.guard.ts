import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private _cookieService:CookieService) { }

  canActivate() {
    if (this._cookieService.getObject('currentUser')) {
    // if (sessionStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }else{
      // not logged in so redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
