import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ApiServiceConfig, DevKitModule, UserServiceConfig } from 'projects/dev-kit/src/public-api';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonModule } from './pokemon/pokemon.module';


const userConfig: UserServiceConfig = {
  cookiePrefix: environment.prefix
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DevKitModule.forRoot(null, userConfig),
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    PokemonModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
