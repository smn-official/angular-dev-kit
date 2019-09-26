import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DevKitModule, ApiService } from 'projects/dev-kit/src/public-api';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DevKitModule.forRoot({ id: 'Cod_Opc', name: 'Nom_Opc' }),
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
