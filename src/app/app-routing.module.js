/**
 * Created by saruni on 4/5/17.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var heroes_component_1 = require("./heroes/heroes.component");
var hero_detail_component_1 = require("./heroes/hero-detail.component");
var users_component_1 = require("./users/users.component");
var login_component_1 = require("./users/login.component");
var landingpage_component_1 = require("./landingpage/landingpage.component");
var register_component_1 = require("./users/register.component");
var page_not_found_1 = require("./page-not-found/page-not-found");
var book_list_component_1 = require("./library/book-list.component");
var institutions_component_1 = require("./institutions/institutions.component");
var about_us_component_1 = require("./about-us/about-us.component");
var terms_and_conditions_component_1 = require("./terms-and-conditions/terms-and-conditions.component");
var login_page_component_1 = require("./users/login-page.component");
var routes = [
    { path: 'home', component: landingpage_component_1.LandingPageComponent },
    {
        path: 'dashboard',
        loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
    },
    { path: 'heroes', component: heroes_component_1.HeroesComponent },
    { path: 'login', component: login_component_1.LoginFormComponent },
    { path: 'login-page', component: login_page_component_1.LoginPageComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'books', component: book_list_component_1.BooksComponent },
    { path: 'institutions', component: institutions_component_1.InstitutionComponent },
    { path: 'about-us', component: about_us_component_1.AboutUsComponent },
    { path: 'terms', component: terms_and_conditions_component_1.TermsAndConditionsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: page_not_found_1.PageNotFoundComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes, { enableTracing: true })
        ],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
exports.routingComponents = [
    heroes_component_1.HeroesComponent,
    hero_detail_component_1.HeroDetailComponent,
    users_component_1.UsersComponent,
    login_component_1.LoginFormComponent,
    login_page_component_1.LoginPageComponent,
    landingpage_component_1.LandingPageComponent,
    page_not_found_1.PageNotFoundComponent,
    register_component_1.RegisterComponent,
    book_list_component_1.BooksComponent,
    institutions_component_1.InstitutionComponent,
    about_us_component_1.AboutUsComponent,
    terms_and_conditions_component_1.TermsAndConditionsComponent,
];
//# sourceMappingURL=app-routing.module.js.map