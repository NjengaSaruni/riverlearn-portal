/**
 * Created by saruni on 7/21/17.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var TermsAndConditionsComponent = (function () {
    function TermsAndConditionsComponent() {
    }
    TermsAndConditionsComponent.prototype.ngOnInit = function () {
        $('.ui.modal').modal();
    };
    return TermsAndConditionsComponent;
}());
TermsAndConditionsComponent = __decorate([
    core_1.Component({
        selector: 'terms-and-conditions',
        templateUrl: './terms-and-conditions.component.html',
        styleUrls: [
            './terms-and-conditions.component.css'
        ]
    })
], TermsAndConditionsComponent);
exports.TermsAndConditionsComponent = TermsAndConditionsComponent;
//# sourceMappingURL=terms-and-conditions.component.js.map