import { Injectable } from '@angular/core';
import { CanActivate, Route, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoginService } from '../_services/login.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly loginservice: LoginService,
    private toastr: ToastrService,
    private readonly router: Router
  ) {}
  canActivate(): Observable<boolean> {
    return this.loginservice.currentUser$.pipe(
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
