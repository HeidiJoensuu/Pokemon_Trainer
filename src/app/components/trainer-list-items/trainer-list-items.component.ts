import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/_services/login.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from '../../_models/user.model';

@Component({
  selector: 'app-trainer-list-items',
  templateUrl: './trainer-list-items.component.html',
  styleUrls: ['./trainer-list-items.component.css'],
})
export class TrainerListItemsComponent implements OnInit {
  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {}
  get userCurrent() {
    console.log(this.loginService.currentUser$);
    return this.loginService.currentUser$;
  }
  get user() {
    return this.userService.user;
  }
  get name() {
    return this.userService.user?.username;
  }
  get len(): boolean | undefined{
    return Boolean(this.userService.user?.pokemon.length )
  }

  handleRemoveClick(removeForm: NgForm) {
    const { pokemon } = removeForm.value;
    console.log(pokemon);
    console.log('clicked');
  }
}
