import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { NotificationService } from "../Notification/notification.service";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router, private notify: NotificationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuth = this.authService.getIsAuth()
    if(!isAuth) {
      this.notify.showError('Login', 'Please Login To See Your Account')
      this.router.navigate(['login'])
    }
    return isAuth
  }
}
