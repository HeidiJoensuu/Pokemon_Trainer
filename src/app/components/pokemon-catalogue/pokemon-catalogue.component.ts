import { OnInit } from '@angular/core';
import { PokemonList } from 'src/app/models/Pokemon-List'
import { PokemonsService } from 'src/app/services/pokemons.service';
import { Component } from '@angular/core';
import { DecimalPipe, NgFor } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, take, map, tap, startWith } from 'rxjs';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.component.html',
  styleUrls: ['./pokemon-catalogue.component.css']
})

export class PokemonCatalogueComponent implements OnInit {
  page = 1;
  pageSize= 10;
  collectionSize = 1279
  jtn: any = []
  filter = new FormControl('', {nonNullable: true})

  constructor(private readonly pokemonsService: PokemonsService) {
    /*
    this.jtn = this.filter.valueChanges.pipe(
      startWith(''),
      tap(j => console.log(j)),
      map((input) => this.searchPokemons(input))
    )
    */
  }

  ngOnInit(): void {
    this.pokemonsService.fetchPokemons()
    this.refresPage()
    this.refreshPokemons()
  }

  public get pokemons$(): Observable<PokemonList[]> {  
    return this.pokemonsService.showingPokemons$
  }

  private refresPage = () => {
    const result = this.pokemonsService.pokemons$
    .subscribe(pokemons => {
      this.jtn = pokemons.slice(((this.page-1)*this.pageSize),(this.page*this.pageSize))
    })
    result.unsubscribe()
  }

  private searchPokemons = (input: string) => {
    console.log(input);
    
    return this.pokemonsService.pokemons$
    .pipe(
      tap(poke => console.log(poke))
      )
  }

  refreshPokemons() {
    this.refresPage()
    this.pokemonsService.fetchPokemonPictures(this.jtn)
  }
  
}



