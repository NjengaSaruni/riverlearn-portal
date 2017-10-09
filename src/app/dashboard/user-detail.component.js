/**
 * Created by saruni on 7/22/17.
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
var user_service_1 = require("../common/services/user.service");
var common_service_1 = require("../common/services/common.service");
var UserDetailComponent = (function () {
    function UserDetailComponent(commonService, userService) {
        this.commonService = commonService;
        this.userService = userService;
        this.jwtHelper = new common_service_1.JwtHelper();
    }
    UserDetailComponent.prototype.ngOnInit = function () {
        var token = this.commonService.getJwtToken();
        var user = this.jwtHelper.decodeToken(token);
        this.getUser(user.user_id);
    };
    UserDetailComponent.prototype.getUser = function (id) {
        var _this = this;
        var user = null;
        this.userService.getUser(id)
            .subscribe(function (user) { return _this.loggedInUser = user; }, function (error) { return _this.errorMessage = error; });
        return user;
    };
    return UserDetailComponent;
}());
UserDetailComponent = __decorate([
    core_1.Component({
        selector: 'profile',
        templateUrl: './user-detail.component.html',
        styleUrls: [
            './user-detail.component.css'
        ]
    }),
    __metadata("design:paramtypes", [common_service_1.CommonService,
        user_service_1.UserService])
], UserDetailComponent);
exports.UserDetailComponent = UserDetailComponent;
//# sourceMappingURL=user-detail.component.js.map