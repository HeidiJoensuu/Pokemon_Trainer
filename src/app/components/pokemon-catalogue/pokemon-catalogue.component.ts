import { OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { DecimalPipe, NgFor } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, ObjectUnsubscribedError, Observable, of } from 'rxjs';
import { take, map, tap, startWith, filter, find, switchMap, catchError } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.component.html',
  styleUrls: ['./pokemon-catalogue.component.css'],
})

/**
 * This class handles events and params that are related to listing pokemons
 */
export class PokemonCatalogueComponent implements OnInit {
  page = 1;
  pageSize = 10;
  collectionSize = 1279;
  showingPokemons: Pokemon[] = [];
  caughtPokemon: boolean = false

  constructor(
    private readonly pokemonsService: PokemonsService,
    private readonly userService: UserService,
  ) {}

  ngOnInit(): void {
    //(Maybe in future) This variable for combineLatest -pipe operator
    const asd = this.pokemonsService.fetchPokemons();
    this.refreshPokemons();
  }

  /**
   * @returns Observable<Pokemon[]>
   */
  public get pokemons$(): Observable<Pokemon[]> {
    return this.pokemonsService.showingPokemons$;
  }

  /**
   * Checks if the currently rendering pokemon is already caught
   * @param pokemon string - Pokemon to find
   * @returns boolean - caughtPokemon
   */
  public caught(pokemon: string): boolean {
    this.userService.user$.pipe(
      switchMap((user: User): any => {
        if (user?.pokemon?.includes(pokemon)) this.caughtPokemon = true
        else this.caughtPokemon = false
        return this.caughtPokemon
      }),
      catchError(err => of(err))
      ).subscribe().unsubscribe()
      return this.caughtPokemon

  }

  /**
   * Sets showing pokemons depending on page (number) and 
   * pageSize (number) variables
   */
  private refresPage = () => {
    const result = this.pokemonsService.pokemons$.subscribe((pokemons) => {
      try {
        this.showingPokemons = pokemons.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } catch (error) {
        console.log(error);
      }
    });
    result.unsubscribe();
  };

  /**
   * Sets new showing pokemons and sends order to find 
   * pictures for them from pokemonService
   */
  refreshPokemons() {
    this.refresPage();
    this.pokemonsService.fetchPokemonPictures(this.showingPokemons);
  }

  /**
   * Sends order to set selected pokemon to be added into user's pokemon-list
   * @param pokemon string - Pokemon to be caught
   */
  catchPokemon(pokemon: string) {
    this.userService.user$.pipe(take(1)).subscribe((user)=> {
      if(user.id && user.pokemon){
        const listCatchedPokemons: string[] = [...user.pokemon]
        listCatchedPokemons.push(pokemon)
        this.userService.patchPokemon(listCatchedPokemons, user)
      }
    })
  }
}
