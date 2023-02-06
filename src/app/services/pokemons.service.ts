import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, map, Observable, take, tap} from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { StorageKeys } from '../enums/storage-keys';
import { Url } from "../enums/url";

@Injectable({
  providedIn: 'root',
})

/**
 * This class provides services for pokemon-related events and variables
 */
export class PokemonsService {
  constructor(private readonly http:HttpClient) { }

  private readonly _pokemons$: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>([])
  private readonly _showingPokemons$: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>([])

  /**
   * Gets pokemons from api
   * @returns Observable<Pokemon[]>
   */
  public fetchPokemons(): Observable<Pokemon[]> {
    const pokemons = this.http.get<PokemonsResponse>(Url.URLPOKEAPI)
    .pipe(
      map((pokemonResponse: PokemonsResponse) => pokemonResponse.results)
    )
    
    pokemons.subscribe({
      next: (pokemons: Pokemon[]) => {
        if (!(window.sessionStorage.getItem(StorageKeys.Pokemon))) {
          this._pokemons$.next(pokemons)
          window.sessionStorage.setItem(StorageKeys.Pokemon, JSON.stringify(pokemons))
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    })
    return pokemons;
  }

  /**
   * Compines pokemon's id and default picture url
   * @param url  string
   * @returns string - url to image og the pokemon
   */
  private findDefaultPicture = (url: string): string => {
    const number = url.match(/(\d+)/g)
    if (number?.length === 2){
      return `${Url.URLDEFAULTIMG}${number.at(1)}.png`
    } return ''
  }

  /**
   * Finds url's for pokemon pictures
   * @param pokemon  Pokemon {name: string, url: string, picture?: string}
   * @returns Pokemon {name: string, url: string, picture?: string}
   */
  private findPicture = (pokemon: Pokemon): Pokemon => {
    if (!pokemon.picture) {     
      this.http.get(pokemon.url)
      .pipe(
        map(result => result)
      ).subscribe({
        next: (answer) => {
          //@ts-ignore
          let picture = answer.sprites?.other?.dream_world?.front_default
          if (picture === null) picture = this.findDefaultPicture(pokemon.url)
          let pokemonList = JSON.parse(window.sessionStorage.getItem(StorageKeys.Pokemon)|| '{}')
          const index = pokemonList.findIndex((e: { name: string; }) => e.name ===pokemon.name)
          pokemonList[index].picture = picture
          pokemon.picture = picture
          return pokemon
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      })
    }
    return pokemon;
  };

  /**
   * Finds url's for pokemon pictures and saves them
   * @param pokemons [{name: string, url: string, picture?: string}]
   */
  public fetchPokemonPictures(pokemons: Pokemon[]): void {
    let showingPokemons: Pokemon[] = [];
    pokemons.forEach((element: Pokemon) => {
      if (!element.picture) {     
        this.http.get(element.url)
        .pipe(
          map(result => result)
        ).subscribe({
          next: (pokemon) => {
            //@ts-ignore
            let picture = pokemon.sprites?.other?.dream_world?.front_default
            if (picture === null) picture = this.findDefaultPicture(element.url)
            let pokemonList = JSON.parse(window.sessionStorage.getItem(StorageKeys.Pokemon)|| '{}')
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
        this._showingPokemons$.next(pokemons);
      }
    });
  }

  /**
   * Finds pictures for pokemons using findPicture-function.
   * @param pokemons string[]
   * @returns Pokemon[] [{name: string, url: string, picture?: string}]
   */
  public fetchPokemonPicturesW2 = (pokemons: string[]): Pokemon[] =>  {
    const showingPokemons: Pokemon[] = []
    const pokemonList = JSON.parse(window.sessionStorage.getItem(StorageKeys.Pokemon)|| '{}')
    pokemons.forEach((element: string) => {
      let currentPokemon: Pokemon = pokemonList.find((poke: Pokemon) => poke.name === element)
      currentPokemon = this.findPicture(currentPokemon)
      showingPokemons.push(currentPokemon)
    })
    return showingPokemons
  }
  
  /**
   * Retuns list of x amound of pokemons
   * @returns Observable<Pokemon[]>
   */
  public get showingPokemons$() : Observable<Pokemon[]> {
    return this._showingPokemons$.asObservable()
  }

  /**
   * Retuns list of all pokemons
   *  @returns Observable<Pokemon[]>
   */
  public get pokemons$() : Observable<Pokemon[]> {
    this._pokemons$.next(JSON.parse(window.sessionStorage.getItem(StorageKeys.Pokemon)|| '{}'))
    return this._pokemons$.asObservable()
  }
}

interface PokemonsResponse {
  results: Pokemon[];
}
