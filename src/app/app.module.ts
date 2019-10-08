import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ApiServiceConfig, DevKitModule, UserServiceConfig } from 'projects/dev-kit/src/public-api';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonModule } from './pokemon/pokemon.module';
import { SMNUIModule } from 'ng-smn-ui';


const apiConfig: ApiServiceConfig = {
  configError: {
    snackMessages: {
      409: 'Static message',
      404: 'Not found message'
    },
    callback: (error) => {
      console.log(error)
    }
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
    PokemonModule,
    SMNUIModule,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
