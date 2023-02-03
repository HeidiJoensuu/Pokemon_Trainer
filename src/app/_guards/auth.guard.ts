import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../_services/login.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly loginservice: LoginService,
    private toastr: ToastrService,
    private readonly router: Router,
    private readonly userService: UserService
  ) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userService.user) {
      return true;
    } else {
      this.toastr.error('You shall not pass ❌');
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
