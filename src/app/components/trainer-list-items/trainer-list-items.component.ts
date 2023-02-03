import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/_services/login.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from '../../_models/user.model';

@Component({
  selector: 'app-trainer-list-items',
  templateUrl: './trainer-list-items.component.html',
  styleUrls: ['./trainer-list-items.component.css']
})

export class TrainerListItemsComponent implements OnInit {  
  constructor(    private readonly loginService: LoginService,
    private readonly userService: UserService) { }



  ngOnInit(): void {
  }
  get userCurrent() {
    console.log(this.loginService.currentUser$)
    return this.loginService.currentUser$;
  }
  get user() {
    return this.userService.user;
  }

}
