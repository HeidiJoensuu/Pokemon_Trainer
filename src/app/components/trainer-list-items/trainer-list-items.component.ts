import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Pokemon } from 'src/app/models/pokemon.model';
import { take } from "rxjs";
import { UnfavouriteService } from 'src/app/services/unfavourite.service';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-trainer-list-items',
  templateUrl: './trainer-list-items.component.html',
  styleUrls: ['./trainer-list-items.component.css'],
})
export class TrainerListItemsComponent implements OnInit {
  pokemons: Pokemon[] | [] = [];
  constructor(
    private readonly userService: UserService,
    private readonly unfavouriteService: UnfavouriteService,
    private readonly pokemonService: PokemonsService
  ) {}

  ngOnInit(): void {
    this.user;
    this.pokemonsPictures();
  }

  get user() {
    return this.userService.user$;
  }
  
/**
 * If theres no pictures fetch from api
 * @returns []
 */
  pokemonsPictures() {
    return this.userService.user$.pipe(take(1)).subscribe((user) => {
      if (user.pokemon)
        return (this.pokemons = this.pokemonService.fetchPokemonPicturesW2(
          user.pokemon
        ));
      return (this.pokemons = []);
    });
  }
  /**
   * call userService user$ and pass pokemonName and user to removeFromFavourites
   * @param pokemonName : string
   */
  handleUnfavouriteClick(pokemonName: string): void {
    this.userService.user$.pipe(take(1)).subscribe((user) => {
      this.unfavouriteService.removeFromFavourites(pokemonName, user);
      this.pokemonsPictures();
    });
  }
}
