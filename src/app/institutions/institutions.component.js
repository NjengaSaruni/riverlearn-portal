/**
 * Created by saruni on 5/25/17.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var institutions_service_1 = require("../common/services/institutions.service");
var InstitutionComponent = (function () {
    function InstitutionComponent(institutionService, router) {
        this.institutionService = institutionService;
        this.router = router;
        this.mode = 'Observable';
    }
    InstitutionComponent.prototype.ngOnInit = function () {
        this.getInstitutions();
    };
    InstitutionComponent.prototype.getInstitutions = function () {
        var _this = this;
        this.institutionService.getInstitutions()
            .subscribe(function (institutions) { return _this.institutions = institutions; }, function (error) { return _this.errorMessage = error; });
    };
    return InstitutionComponent;
}());
InstitutionComponent = __decorate([
    core_1.Component({
        selector: 'institutions',
        templateUrl: './institutions.component.html',
        styleUrls: ['./institutions.component.css'],
        providers: [institutions_service_1.InstitutionService]
    }),
    __metadata("design:paramtypes", [institutions_service_1.InstitutionService,
        router_1.Router])
], InstitutionComponent);
exports.InstitutionComponent = InstitutionComponent;
//# sourceMappingURL=institutions.component.js.map