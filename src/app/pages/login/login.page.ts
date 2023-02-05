import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../_models/user.model';
import { StorageUtil } from '../../_utils/storage.utils';
import { StorageKeys } from '../../_enums/storage-keys';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage {
  //LOGIN PAGE HANDLES REDIRECTION -> login form -> logic
  constructor(
    private readonly router: Router,
    private toastr: ToastrService  ) {}

  get userCurrent(): boolean {
    return Boolean(StorageUtil.storageRead<User>(StorageKeys.User))
  }
  handleLogin(): void {
    this.toastr.success('Successfully logged in.');
    this.router.navigateByUrl('/profile');
  }
}
