import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage{
//LOGIN PAGE HANDLES REDIRECTION -> login form -> logic
  constructor(private readonly router: Router) { }

  handleLogin(): void {
    this.router.navigateByUrl("/profile")
  }

}
