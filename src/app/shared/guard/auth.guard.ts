import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // console.log(this.authService.accessTokenId);
      if (this.authService.accessTokenId) {
        // this.router.navigate(['/dashboard'], {queryParams: {returnUrl: state.url}});
        return true;
    }
    // not logged in so redirect to login page with the return url and return false
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
