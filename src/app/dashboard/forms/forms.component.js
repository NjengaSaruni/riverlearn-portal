/**
 * Created by saruni on 8/18/17.
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
var common_service_1 = require("../../common/services/common.service");
var user_service_1 = require("../../common/services/user.service");
var FormsComponent = (function () {
    function FormsComponent(commonService, userService) {
        this.commonService = commonService;
        this.userService = userService;
    }
    FormsComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    FormsComponent.prototype.getUser = function () {
        var _this = this;
        var jwtHelper = new common_service_1.JwtHelper();
        var errorMessage;
        var token = this.commonService.getJwtToken();
        var user = jwtHelper.decodeToken(token);
        this.userService.getUser(user.user_id)
            .subscribe(function (user) { return _this.user = user; }, function (error) { return errorMessage = error; });
    };
    return FormsComponent;
}());
FormsComponent = __decorate([
    core_1.Component({
        templateUrl: './forms.component.html',
        styleUrls: ['./forms.component.css']
    }),
    __metadata("design:paramtypes", [common_service_1.CommonService,
        user_service_1.UserService])
], FormsComponent);
exports.FormsComponent = FormsComponent;
//# sourceMappingURL=forms.component.js.map