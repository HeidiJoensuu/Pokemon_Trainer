import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of, switchMap } from 'rxjs';
import { User } from '../_models/user.model';
import { environment } from '../../environments/environment';

const { apiKey, apiPokemon } = environment;
//handle login features
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  //inject http here

  constructor(
    private readonly http: HttpClient  ) {}

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
  //GET //pop the last item on array and return
  private checkUsername(username: string): Observable<User | undefined> {
    return this.http
      .get<User[]>(`${apiPokemon}`)  //GET users then map find and pop matching username
      .pipe(
        map((response: User[]) => {
          return response.find(
            (user) =>
              user.username.toLowerCase().match(username.toLowerCase()) && response.pop()
          );
        })
      );
  }
  //POST
  private createUser(username: string) {
    console.log('creates user: ', username);
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
}
