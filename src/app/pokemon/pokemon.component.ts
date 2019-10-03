import { Component, OnInit } from '@angular/core';
import { ApiService } from 'projects/dev-kit/src/public-api';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  list: any[];

  constructor(private api: ApiService) {
    this.list = [];
  }

  ngOnInit() {
    this.api
      .get(
        'https://pokeapi.co/api/v2/pokemon',
        { offset: 0, limit: 50 },
        { headers: { AnotherHeader: 'prova!' } }
      )
      .subscribe((res: any) => {
        this.list = res.results;
      });
  }
}
