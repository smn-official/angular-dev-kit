import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ApiServiceConfig, DevKitModule, UserServiceConfig } from 'projects/dev-kit/src/public-api';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonModule } from './pokemon/pokemon.module';


const apiConfig: ApiServiceConfig = {
  id: 'Cod_Opc',
  name: 'Nom_Opc',
  headers: {
    authorization: 'Authentication',
    option: 'Option'
  }
};

const userConfig: UserServiceConfig = {
  cookiePrefix: environment.prefix
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DevKitModule.forRoot(apiConfig, userConfig),
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    PokemonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
