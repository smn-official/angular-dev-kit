import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'projects/dev-kit/src/public-api';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  @ViewChild('pokemonDialog', { static: false }) pokemonDialog: any;

  list: any[];
  loading: boolean;
  pokemon: any;

  constructor(private api: ApiService) {
    this.list = [];
    this.pokemon = {};
  }

  ngOnInit() {
    this.api
      .get(
        'https://pokeapi.co/api/v2/pokemon',
        { offset: 0, limit: 964 },
        { headers: { AnotherHeader: 'prova!' }, cleanError: true }
      )
      .subscribe((res: any) => {
        this.list = res.results;
      });
  }

  get(pokemon) {
    this.pokemon = {};
    this.loading = true;

    this.pokemonDialog.show({
      cardSize: 480
    });

    this.api
      .get(pokemon.url)
      .subscribe({
        next: res => this.pokemon = res,
        complete: () => this.loading = false
      });
  }

  convertHectogramsToKilo(hectograms) {
    const kilo = hectograms / 10 ;
    return kilo.toFixed(2);
  }
  convertDecimetresToMeters(decimetres) {
    const meters = decimetres * 10 / 100;
    return meters.toFixed(2);
  }
}
