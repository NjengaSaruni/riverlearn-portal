import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { HttpModule, JsonpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents}     from './app-routing.module';

import { UserService } from './common/services/user.service';
import { HeroService } from './heroes/hero.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InstitutionService } from './common/services/institutions.service';
import {CommonService} from './common/services/common.service';
import {DivisionService} from './common/services/divisions.service';
import {AuthGuard} from './common/services/auth-guard.service';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    JsonpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    routingComponents,
  ],
  providers: [
    AuthGuard,
    CommonService,
    UserService,
    HeroService,
    InstitutionService,
    DivisionService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }


