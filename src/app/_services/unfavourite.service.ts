import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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


  public removeFromFavourites(pokemonName: string, user: User): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    });
    console.log(pokemonName, user);
    if ((user)?.pokemon) {
      console.log((user)?.pokemon.find((pokemon: string) => pokemon === pokemonName));
      
      if (!(user)?.pokemon.find((pokemon: string) => pokemon === pokemonName)) {
        throw new Error('add to user: There is no user'); //?
      } else {
        //const filteredPokemons = [...user.pokemon].filter(pokemon => pokemon!==pokemonName)
        const i = user.pokemon.findIndex((pokemon) => pokemon === pokemonName);
        let filteredList = [...user.pokemon].filter((val, index) => index != i);
        const stringifyList = JSON.stringify(filteredList)
        //{ pokemon: filteredList },
        this.http.patch<User>(`${apiPokemon}/${user?.id}`,
          
          JSON.stringify({ pokemon: [...user.pokemon = filteredList] }),
            { headers }
          )
          .subscribe({
            next: (answer) => {
              this.userService.user = answer;
            },
            error: (error: HttpErrorResponse) => {
              console.log(error.message)
            }
          })
      }
    }
    //check user > PATCH
  }
}
