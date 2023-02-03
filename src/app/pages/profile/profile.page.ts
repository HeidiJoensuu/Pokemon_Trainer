import { Component, Input, OnInit, Output } from '@angular/core';
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
  ) {}

  ngOnInit(): void {}

}
