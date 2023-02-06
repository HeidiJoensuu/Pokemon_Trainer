import {
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})

/**
 * This class handles events and params that are related to log in
 */
export class LoginFormComponent implements OnInit {
  
  @Output() login: EventEmitter<void> = new EventEmitter(); 
  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService,
    private readonly toastr: ToastrService
  ) {}
  ngOnInit(): void {}
  
  /**
   * Handles the login/register contains simple name requirement
   * invokes loginServices
   * inform/emits to parent component 
   * @param loginForm NgForm
   */
  handleSubmit(loginForm: NgForm): void {
    const { username } = loginForm.value;
    if (username.length < 3) {
      this.toastr.info('Username too lower 🧙‍♂️');
    } else {
      this.loginService.login(username).subscribe({
        next: (user: User) => {
          this.userService.user = user;
          this.login.emit();
        },
        error: (err) => console.log(err),
        complete: () => console.log('login complete'),
      });
    }
    
  }
}
