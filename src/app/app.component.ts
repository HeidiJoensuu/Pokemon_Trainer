import { Component, OnInit } from '@angular/core';
import { StorageKeys } from './_enums/storage-keys';
import { User } from './_models/user.model';
import { LoginService } from './_services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pokemon_Trainer';


  constructor(private readonly loginService: LoginService){}
  ngOnInit(): void {
    this.setCurrentUser()
  }
  setCurrentUser() {
    const userString = localStorage.getItem(StorageKeys.User);
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.loginService.setCurrentUser(user);
  }
}
