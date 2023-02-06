import { Component, OnInit } from '@angular/core';
import { StorageKeys } from './enums/storage-keys';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pokemon_Trainer';

  constructor(){}
  ngOnInit(): void {
    this.setCurrentUser()
  }
  /**
   * when app runs call this and if user exists already in storage return it 
   * @returns user : User
   */
  setCurrentUser() {
    const userString = localStorage.getItem(StorageKeys.User);
    if (!userString) return;
    const user: User = JSON.parse(userString);
  }
}
