/**
 * Created by saruni on 8/19/17.
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
var DashboardMainComponent = (function () {
    function DashboardMainComponent() {
        this.contentReady = false;
    }
    DashboardMainComponent.prototype.ngOnInit = function () {
        console.log('In component');
    };
    DashboardMainComponent.prototype.ngAfterViewInit = function () {
        this.contentReady = true;
    };
    return DashboardMainComponent;
}());
DashboardMainComponent = __decorate([
    core_1.Component({
        selector: 'dashboard-main',
        template: "\n    <div>This is something</div>\n  "
    }),
    __metadata("design:paramtypes", [])
], DashboardMainComponent);
exports.DashboardMainComponent = DashboardMainComponent;
//# sourceMappingURL=dashboard-main.component.js.map