import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage{

//LOGIN PAGE HANDLES REDIRECTION -> login form -> logic
  constructor(private readonly router: Router, private toastr: ToastrService) { }

  handleLogin(): void {
    this.toastr.success('Successfully logged in.');
    this.router.navigateByUrl("/profile")
  }

}
