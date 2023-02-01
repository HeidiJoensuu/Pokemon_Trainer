import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoginService } from '../_services/login.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  router: any;
  constructor(
    private readonly loginservice: LoginService,
    private toastr: ToastrService
  ) {}
  canActivate(): Observable<boolean> {
    return this.loginservice.currentUser$.pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          this.toastr.error('You shall not pass ❌');
          return false;
        }
      })
    );
  }
}
