import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, map, Observable} from 'rxjs';
import { Pokemon } from '../_models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private readonly http:HttpClient) { }

  private readonly _pokemons$: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>([])
  private readonly _showingPokemons$: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>([])

  public fetchPokemons(): void {
    this.http.get<PokemonsResponse>("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    .pipe(
      map((pokemonResponse: PokemonsResponse) => pokemonResponse.results)
    ).subscribe({
      next: (pokemons: Pokemon[]) => {
        if (!(window.sessionStorage.getItem('pokemons'))) {
          this._pokemons$.next(pokemons)
          window.sessionStorage.setItem('pokemons', JSON.stringify(pokemons))
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    })
  }

  public fetchPokemonPictures(poke: Pokemon[]): void {
    let showingPokemons: Pokemon[] = []
    poke.forEach((element: Pokemon) => {
      if (!element.picture) {     
        this.http.get(element.url)
        .pipe(
          map(result => result)
        ).subscribe({
          next: (pokemon) => {
            //@ts-ignore
            let picture = pokemon.sprites?.other?.dream_world?.front_default
            let pokemonList = JSON.parse(window.sessionStorage.getItem('pokemons')|| '{}')
            const index = pokemonList.findIndex((e: { name: string; }) => e.name ===element.name)
            pokemonList[index].picture = picture
            element.picture = picture
            showingPokemons.push(element);
            window.sessionStorage.setItem('pokemons', JSON.stringify(pokemonList))
            this._pokemons$.next(pokemonList)
            this._showingPokemons$.next(showingPokemons)
          },
          error: (error: HttpErrorResponse) => {
            console.log(error.message);
          }
        })
      } else {
        this._showingPokemons$.next(poke)
      }
    })
  }
  
  public get showingPokemons$() : Observable<Pokemon[]> {
    return this._showingPokemons$.asObservable()
  }

  public get pokemons$() : Observable<Pokemon[]> {
    this._pokemons$.next(JSON.parse(window.sessionStorage.getItem('pokemons')|| '{}'))
    return this._pokemons$.asObservable()
  }

}

interface PokemonsResponse {
  results: Pokemon[]
}
