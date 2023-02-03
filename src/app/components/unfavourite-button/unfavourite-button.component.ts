import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../_models/pokemon.model';
import { User } from '../../_models/user.model';
import { UnfavouriteService } from '../../_services/unfavourite.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-unfavourite-button',
  templateUrl: './unfavourite-button.component.html',
  styleUrls: ['./unfavourite-button.component.css'],
})
export class UnfavouriteButtonComponent implements OnInit {
  @Input() pokemonName?: Pokemon;
  constructor(private unfavouriteService: UnfavouriteService) {}

  ngOnInit(): void {}
  get pokemon() {
    return this.pokemonName?.name;
  }
  handleUnfavouriteClick(): void {
    this.unfavouriteService.removeFromFavourites(this.pokemon).subscribe({
      next: (response: User) => {
        console.log('Next ', response);
      },
      error: (err: HttpErrorResponse) => console.log(err.message),
    });
  }
}
