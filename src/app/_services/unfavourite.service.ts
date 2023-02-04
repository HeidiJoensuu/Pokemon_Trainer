import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { finalize, findIndex, Observable, tap, throwError } from 'rxjs';
import { User } from '../_models/user.model';
import { environment } from '../../environments/environment';
import { Pokemon } from '../_models/pokemon.model';

const { apiKey, apiPokemon } = environment;
@Injectable({
  providedIn: 'root',
})
export class UnfavouriteService {
  constructor(
    private http: HttpClient,
    private readonly userService: UserService
  ) {}
  //-----------------fetch

  public removeFromFavourites(pokemonName: string, user: User): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    });
    console.log(pokemonName, user);
    
/*
    if (
      !(user)?.pokemon.find((pokemon: Pokemon, user: User) => pokemon.name === pokemonName)
    ) {
      throw new Error('add to user: There is no user');
    } else {
      const i = user.pokemon.findIndex((x) => x.name === pokemonName);
      const po = [...user.pokemon];
      const pop = po.filter((val, index) => index != i);
      return this.http
        .patch<User>(
          `${apiPokemon}/${user?.id}`,
          { pokemon: [...user.pokemon = pop] },
          { headers }
        )
        .pipe(
          //assign value in tap
          tap((updatedUser: User) => {
            // in a tap you can tap into data but not manipulate it
            console.log('Updated user: ', updatedUser);
            this.userService.user = updatedUser;
          }),
          finalize(() => {
            console.log('done');
          })
        );
    }
    */
    //check user > PATCH
  }
}
