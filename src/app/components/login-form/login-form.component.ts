import {
  Component,
  OnInit,
  NgModule,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../_services/login.service';
import { User } from '../../_models/user.model';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  //emitter output
  @Output() login: EventEmitter<void> = new EventEmitter(); //emits to parent component
  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService
  ) {}
  ngOnInit(): void {}
  //input data
  handleSubmit(loginForm: NgForm): void {
    const { username } = loginForm.value;
    console.log(username);

    //login contains get and post for pokemon api > user service will save current session // emit to parent: login form
    this.loginService.login(username).subscribe({
      next: (user: User) => {
        this.userService.user = user;
        this.loginService.setCurrentUser(user);
        this.login.emit();
      },
      error: (err) => console.log(err),
      complete: () => console.log('login complete'),
    });
  }
}
