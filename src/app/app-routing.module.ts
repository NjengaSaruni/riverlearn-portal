/**
 * Created by saruni on 4/5/17.
 */

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './heroes/hero-detail.component';
import { UsersComponent } from './users/users.component';
import { LoginFormComponent } from './users/login.component';
import { LandingPageComponent } from './landingpage/landingpage.component';
import { RegisterComponent } from './users/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found';
import { BooksComponent} from './library/book-list.component';
import { InstitutionComponent } from './institutions/institutions.component';
import { AboutUsComponent } from './about-us/about-us.component';
import {TermsAndConditionsComponent} from './terms-and-conditions/terms-and-conditions.component';
import {LoginPageComponent} from './users/login-page.component';

const routes: Routes = [
  { path: 'home',  component: LandingPageComponent },
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
  },
  { path: 'heroes',     component: HeroesComponent },
  { path: 'login', component: LoginFormComponent},
  { path: 'login-page',component:  LoginPageComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'books', component: BooksComponent },
  { path: 'institutions', component: InstitutionComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'terms', component: TermsAndConditionsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(
    routes,
    { enableTracing : true }
  )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
export const routingComponents = [
  HeroesComponent,
  HeroDetailComponent,
  UsersComponent,
  LoginFormComponent,
  LoginPageComponent,
  LandingPageComponent,
  PageNotFoundComponent,
  RegisterComponent,
  BooksComponent,
  InstitutionComponent,
  AboutUsComponent,
  TermsAndConditionsComponent,
]
