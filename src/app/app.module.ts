import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DevKitModule, ApiService } from 'projects/dev-kit/src/public-api';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DevKitModule.forRoot({ id: 'Cod_Opc', name: 'Nom_Opc' }, { cookiePrefix: environment.prefix }),
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
