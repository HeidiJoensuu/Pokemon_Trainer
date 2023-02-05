import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private toastr: ToastrService,
    private readonly router: Router,
  ) {}
  canActivate(): 
    Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userService.user$.pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          this.toastr.error('You shall not pass ❌');
          this.router.navigateByUrl('/');
          return false;
        }
      })
    );
  }
}
