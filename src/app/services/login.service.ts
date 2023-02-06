import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of, switchMap } from 'rxjs';
import { User } from '../models/user.model';

import { environment } from '../../environments/environment.prod';
import { Url } from "../enums/url";

const { apiKey } = environment;

@Injectable({
  providedIn: 'root',
})
export class LoginService {

 constructor(private readonly http: HttpClient) {}

  /**
   * checks given string, with http get if name exists return object
   * else create a new object with username
   * @param username : string
   * @returns user : object
   */

  //! 1) login function checks  exists or undefined > switch regarding to that
  public login(username: string): Observable<User> {
    return this.checkUsername(username).pipe(
      switchMap((user: User | undefined) => {
        console.log('is undefined? : ', user, ' to: ', username);

        if (user === undefined) {
          return this.createUser(username);
        }
        return of(user);
      })
    );
  }

  /**
   * checks if current user exists GET
   * @param username : string
   * @returns user : object
   */
  private checkUsername(username: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${Url.URLAPI}`).pipe(
      map((response: User[]) => {
        return response.find(
          (user) =>
            user.username.toLowerCase() === username.toLowerCase() &&
            response.pop()
        );
      })
    );
  }
  /**
   * create new user object with given string POST
   * @param username : string
   * @returns user : object
   */
  private createUser(username: string) {
    console.log('creates user: ', username);

    const user = {
      username,
      pokemon: [],
    };
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'x-api-key': apiKey,
    });

    return this.http
      .post<User>(Url.URLAPI, user, {
        headers,
      })
      .pipe(
        map((user) => {
          return user;
        })
      );
  }
}
