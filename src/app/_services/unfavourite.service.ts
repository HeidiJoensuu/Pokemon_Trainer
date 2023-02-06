import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { User } from '../_models/user.model';
import { environment } from '../../environments/environment';

const { apiKey, apiPokemon } = environment;
@Injectable({
  providedIn: 'root',
})
export class UnfavouriteService {
  constructor(
    private http: HttpClient,
    private readonly userService: UserService
  ) {}

  /**
   * Finds matching pokemon name from user object if so then remove it with PATCH
   * @param pokemonName 
   * @param user 
   */
  public removeFromFavourites(pokemonName: string, user: User): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    });
    console.log(pokemonName, user);
    if ((user)?.pokemon) { 
      if (!(user)?.pokemon.find((pokemon: string) => pokemon === pokemonName)) {
        throw new Error("No pokemon found in the favourites"); //?
      } else {
        const filteredPokemons = [...user.pokemon].filter(pokemon => pokemon!==pokemonName)
        this.http.patch<User>(`${apiPokemon}/${user?.id}`,
          JSON.stringify({ pokemon: [...user.pokemon = filteredPokemons] }),
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
  }
}
