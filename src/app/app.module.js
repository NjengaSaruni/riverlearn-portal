"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms"); // <-- NgModel lives here
var http_1 = require("@angular/http");
var ng_semantic_1 = require("ng-semantic");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var user_service_1 = require("./common/services/user.service");
var hero_service_1 = require("./heroes/hero.service");
var animations_1 = require("@angular/platform-browser/animations");
var institutions_service_1 = require("./common/services/institutions.service");
var common_service_1 = require("./common/services/common.service");
var divisions_service_1 = require("./common/services/divisions.service");
var auth_guard_service_1 = require("./common/services/auth-guard.service");
var angular_jqxbargauge_1 = require("jqwidgets-framework/jqwidgets-ts/angular_jqxbargauge");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            animations_1.BrowserAnimationsModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            http_1.JsonpModule,
            ng_semantic_1.NgSemanticModule,
            app_routing_module_1.AppRoutingModule
        ],
        declarations: [
            app_component_1.AppComponent,
            app_routing_module_1.routingComponents,
            angular_jqxbargauge_1.jqxBarGaugeComponent
        ],
        providers: [
            auth_guard_service_1.AuthGuard,
            common_service_1.CommonService,
            user_service_1.UserService,
            hero_service_1.HeroService,
            institutions_service_1.InstitutionService,
            divisions_service_1.DivisionService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map