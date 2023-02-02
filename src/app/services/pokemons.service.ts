import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, map, Observable} from 'rxjs';
import { PokemonList } from '../models/Pokemon-List';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private readonly http:HttpClient) { }

  private readonly _pokemons$: BehaviorSubject<PokemonList[]> = new BehaviorSubject<PokemonList[]>([])
  private readonly _showingPokemons$: BehaviorSubject<PokemonList[]> = new BehaviorSubject<PokemonList[]>([])

  public fetchPokemons(): void {
    this.http.get<PokemonsResponse>("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    .pipe(
      map((pokemonResponse: PokemonsResponse) => pokemonResponse.results)
    ).subscribe({
      next: (pokemons: PokemonList[]) => {
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

  public fetchPokemonPictures(poke: any): void {
    let showingPokemons: any[] = []
    poke.forEach((element: any) => {
      if (!element.picture) {     
        this.http.get(element.url)
        .pipe(
          map(result => result)
        ).subscribe({
          next: (pokemon) => {
            //@ts-ignore
            let picture = pokemon.sprites?.other?.dream_world?.front_default
            let jee = JSON.parse(window.sessionStorage.getItem('pokemons')|| '{}')
            const index = jee.findIndex((e: { name: string; }) => e.name ===element.name)
            jee[index].picture = picture
            element.picture = picture
            showingPokemons.push(element);
            window.sessionStorage.setItem('pokemons', JSON.stringify(jee))
            this._pokemons$.next(jee)
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
  
  public get showingPokemons$() : Observable<PokemonList[]> {
    return this._showingPokemons$.asObservable()
  }

  public get pokemons$() : Observable<PokemonList[]> {
    this._pokemons$.next(JSON.parse(window.sessionStorage.getItem('pokemons')|| '{}'))
    return this._pokemons$.asObservable()
  }
}

interface PokemonsResponse {
  results: PokemonList[]
}
