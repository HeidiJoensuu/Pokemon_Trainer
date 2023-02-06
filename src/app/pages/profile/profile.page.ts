import { Component, Input, OnInit, Output } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css'],
})
export class ProfilePage implements OnInit {
  
  constructor(
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.user
  }

  get user() {
    return this.userService.user$;
  }
}
