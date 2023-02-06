import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { finalize, findIndex, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Pokemon } from '../models/pokemon.model';

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
    if ((user)?.pokemon) {
      if (!(user)?.pokemon.find((pokemon: string) => pokemon === pokemonName)) {
        throw new Error('Pokemon not found.'); //?
      } else {
        const filteredPokemons = [...user.pokemon].filter(pokemon => pokemon!==pokemonName)
        this.http.patch<User>(`${apiPokemon}/${user?.id}`,
          JSON.stringify({ pokemon: [...user.pokemon = filteredPokemons] }),
            { headers }
          )
          .subscribe({
            next: (answer) => {
              console.log(answer);
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
