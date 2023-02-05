import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/_services/login.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from '../../_models/user.model';
import { Pokemon } from 'src/app/_models/pokemon.model';
import { pipe, take, tap, window } from "rxjs";
import { UnfavouriteService } from 'src/app/_services/unfavourite.service';
import { PokemonsService } from 'src/app/_services/pokemons.service';

@Component({
  selector: 'app-trainer-list-items',
  templateUrl: './trainer-list-items.component.html',
  styleUrls: ['./trainer-list-items.component.css'],
})
export class TrainerListItemsComponent implements OnInit {
  pokemons: Pokemon[] | [] = []
  constructor(
    private readonly userService: UserService,
    private readonly unfavouriteService: UnfavouriteService,
    private readonly pokemonService: PokemonsService
  ) {}

  ngOnInit(): void {
    this.user
    this.pokemonsPictures()
  }

  get user() {
    return this.userService.user$;
  }

  pokemonsPictures(){
    return this.userService.user$.pipe(take(1)).subscribe((user) => {
      if (user.pokemon) return this.pokemons =  this.pokemonService.fetchPokemonPicturesW2(user.pokemon)
      return this.pokemons =  []
    })
  }

  handleUnfavouriteClick(pokemonName: string): void {
    this.userService.user$.pipe(take(1)).subscribe(user => {
      this.unfavouriteService.removeFromFavourites(pokemonName, user)
      this.pokemonsPictures()
    })
  }
}
