import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonComponent } from './pokemon.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SMNUIModule } from 'ng-smn-ui';


@NgModule({
  declarations: [PokemonComponent],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    SMNUIModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PokemonModule { }
