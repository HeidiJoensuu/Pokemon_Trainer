import { OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Pokemon } from 'src/app/_models/pokemon.model';
import { PokemonsService } from 'src/app/_services/pokemons.service';
import { UserService } from 'src/app/_services/user.service';
import { Component } from '@angular/core';
import { DecimalPipe, NgFor } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { take, map, tap, startWith, filter } from 'rxjs/operators';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.component.html',
  styleUrls: ['./pokemon-catalogue.component.css'],
})
export class PokemonCatalogueComponent implements OnInit {
  page = 1;
  pageSize = 10;
  collectionSize = 1279;
  showingPokemons: Pokemon[] = [];

  constructor(
    private readonly pokemonsService: PokemonsService,
    private readonly userService: UserService,
  ) {}

  ngOnInit(): void {
    //(Maybe in future) This variable for combineLatest -pipe operator
    const asd = this.pokemonsService.fetchPokemons();
    this.refreshPokemons();
  }

  public get pokemons$(): Observable<Pokemon[]> {
    return this.pokemonsService.showingPokemons$;
  }

  private refresPage = () => {
    const result = this.pokemonsService.pokemons$.subscribe((pokemons) => {
      this.showingPokemons = pokemons.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    });
    result.unsubscribe();
  };

  refreshPokemons() {
    this.refresPage();
    this.pokemonsService.fetchPokemonPictures(this.showingPokemons);
  }

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
