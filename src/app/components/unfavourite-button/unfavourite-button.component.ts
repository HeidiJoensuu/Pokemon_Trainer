import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../_models/pokemon.model';
import { UnfavouriteService } from '../../_services/unfavourite.service';
import { UserService } from 'src/app/_services/user.service';
import { take } from "rxjs";

@Component({
  selector: 'app-unfavourite-button',
  templateUrl: './unfavourite-button.component.html',
  styleUrls: ['./unfavourite-button.component.css'],
})
export class UnfavouriteButtonComponent implements OnInit {
  @Input() pokemonName?: Pokemon;
  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {}
  get pokemon() {
    return this.pokemonName?.name;
  }
  handleUnfavouriteClick(): void {
    this.userService.user$.pipe(take(1)).subscribe(user => {
      //this.unfavouriteService.removeFromFavourites(this.pokemonName, user)
    })
  }
}
