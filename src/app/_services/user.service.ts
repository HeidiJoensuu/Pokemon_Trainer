import { Injectable } from '@angular/core';
import { User } from '../_models/user.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StorageUtil } from '../_utils/storage.utils';
import { StorageKeys } from '../_enums/storage-keys';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const { apiKey, apiPokemon } = environment;
//saving the user
@Injectable({
  providedIn: 'root'
})

export class UserService {

  //this handles saving the user in the storage
  private _user$: BehaviorSubject<User> = new BehaviorSubject<User>({username: ''});
  //get user return true or undefined ...getter
  public get user$(): Observable<User> {
    return this._user$.asObservable()
  }

  //set > save user to local storage ...setter
  set user(user: User){
    StorageUtil.storageSave<User>(StorageKeys.User, user!); // we know at this point it cannot be undefined
    this._user$.next(user)
  }
  constructor(private readonly http:HttpClient) {
    //here we just need to read the storage
    
    this._user$.next(StorageUtil.storageRead<User>(StorageKeys.User))
  }

  public patchPokemon(pokemon: string[], user: User): void {
    const newPokemon = JSON.stringify({pokemon: pokemon})
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'x-api-key': apiKey,
    });
    this.http.patch<User>(`${apiPokemon}/${user.id}`, newPokemon, {headers})
    .subscribe({
      next: (answer) => {
        StorageUtil.storageSave<User>(StorageKeys.User, answer); // we know at this point it cannot be undefined
        this._user$.next(answer)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    })
  }


}
