import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ApiServiceConfig, DevKitModule, UserServiceConfig } from 'projects/dev-kit/src/public-api';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonModule } from './pokemon/pokemon.module';


const apiConfig: ApiServiceConfig = {
  id: 'id',
  name: 'name',
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
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
