/**
 * Created by saruni on 9/24/17.
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
var platform_browser_1 = require("@angular/platform-browser");
var user_service_1 = require("../../common/services/user.service");
var ExamsComponent = (function () {
    function ExamsComponent(userService, titleService) {
        this.userService = userService;
        this.titleService = titleService;
    }
    ExamsComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Examinations");
    };
    ExamsComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getLoggedInUser()
            .subscribe(function (user) { return _this.user = user; }, function (error) { return _this.errorMessage = error; });
    };
    return ExamsComponent;
}());
ExamsComponent = __decorate([
    core_1.Component({
        templateUrl: './exams.component.html',
        styleUrls: ['./exams.component.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        platform_browser_1.Title])
], ExamsComponent);
exports.ExamsComponent = ExamsComponent;
//# sourceMappingURL=exams.component.js.map