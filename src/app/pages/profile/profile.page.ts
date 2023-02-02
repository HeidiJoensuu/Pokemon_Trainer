import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../_services/login.service';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css'],
})
export class ProfilePage implements OnInit {
  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {}
  get userCurrent() {
    return this.loginService.currentUser$;
  }
  get user() {
    return this.userService.user;
  }
}
