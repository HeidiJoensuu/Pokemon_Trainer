import { Component, OnInit } from '@angular/core';
import { StorageUtil } from 'src/app/_utils/storage.utils';
import { LoginService } from '../../_services/login.service';
import { StorageKeys } from '../../_enums/storage-keys';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  //make it public for our html so we can use ternary operation
  constructor(
    public loginService: LoginService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}
  //logout check
  logout() {
    
    this.loginService.logout();
    this.router.navigateByUrl('/');
  }
}
