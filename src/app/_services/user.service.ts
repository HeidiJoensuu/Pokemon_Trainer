import { Injectable } from '@angular/core';
import { User } from '../_models/user.model';
import { StorageUtil } from '../_utils/storage.utils';
import { StorageKeys } from '../_enums/storage-keys';
//saving the user
@Injectable({
  providedIn: 'root'
})
export class UserService {

  //this handles saving the user in the storage
 private _user?: User;
//get user return true or undefined ...getter
 get user(): User | undefined {
  return this._user;
 }

 //set > save user to local storage ...setter
 set user(user: User | undefined){
  StorageUtil.storageSave<User>(StorageKeys.User, user!); // we know at this point it cannot be undefined
  this._user = user;
 }
  constructor() {
    //here we just need to read the storage
    this._user = StorageUtil.storageRead<User>(StorageKeys.User)
   }
}
