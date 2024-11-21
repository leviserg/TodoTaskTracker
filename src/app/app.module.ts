import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '@shared/shared.module';


import { AppComponent } from './app.component';

const COMPONENTS = [AppComponent];

const MODULES = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  SharedModule
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
