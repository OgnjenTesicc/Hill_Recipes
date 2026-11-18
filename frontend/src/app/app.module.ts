import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core-module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }