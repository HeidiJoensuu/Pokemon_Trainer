import { Component, OnInit } from '@angular/core';
import { StorageUtil } from 'src/app/utils/storage.utils';
import { LoginService } from '../../services/login.service';
import { StorageKeys } from '../../enums/storage-keys';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public loginService: LoginService,
    public userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  get user() {
    return StorageUtil.storageRead(StorageKeys.User);

  }

/**
 * Logout removes data of user from local storage and redirects to login
 */
  logout() {
    StorageUtil.storageRemove(StorageKeys.User);
    this.router.navigateByUrl('/login');
  }
}
