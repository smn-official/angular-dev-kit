import { Component, OnInit } from '@angular/core';
import { ApiService } from 'projects/dev-kit/src/public-api';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  constructor(private api: ApiService) {}

  ngOnInit() {
    console.log('teste');
    this.api
      .get(
        'https://pokeapi.co/api/v2/ability',
        { offset: 0, limit: 50 },
        { headers: { AnotherHeader: 'prova!' } }
      )
      .subscribe(res => console.log(res));
  }
}
