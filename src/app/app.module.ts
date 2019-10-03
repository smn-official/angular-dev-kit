import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DevKitModule, ApiServiceConfig, UserServiceConfig } from 'projects/dev-kit/src/public-api';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';

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
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
