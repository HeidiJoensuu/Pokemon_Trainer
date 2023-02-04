import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../_models/user.model';
import { environment } from '../../environments/environment';
import { StorageUtil } from '../_utils/storage.utils';
import { StorageKeys } from '../_enums/storage-keys';

const { apiKey, apiPokemon } = environment;
//handle login features
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  //inject http here
  constructor(private readonly http: HttpClient) {}

  //! 1) login function checks  exists or undefined > switch regarding to that
  public login(username: string): Observable<User> {
    return this.checkUsername(username).pipe(
      switchMap((user: User | undefined) => {
        if (user === undefined) {
          return this.createUser(username);
        }
        return of(user);
      })
    );
  }
  //GET //pop the last item on array and return
  private checkUsername(username: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${apiPokemon}?username=${username}`).pipe(
      map((response: User[]) => {
        return response.pop();
      })
    );
  }
  //POST
  private createUser(username: string) {
    //create user object
    const user = {
      username,
      pokemon: [],
    };
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'x-api-key': apiKey,
    });
    //logic
    return this.http
      .post<User>(apiPokemon, user, {
        headers,
      })
      .pipe(
        map((user) => {
          return user;
        })
      );
  }

  logout() {
    StorageUtil.storageRemove(StorageKeys.User);
  }
}
/*
38 line for safety
  // if (user) {
        //   this.currentUserSource.next(user); //can use this for auth
        // }
60 line for safety
          // if (user) {
          //   this.currentUserSource.next(user);
          // }
*/
