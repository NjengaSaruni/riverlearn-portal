/**
 * Created by saruni on 4/9/17.
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
var user_service_1 = require("../common/services/user.service");
var UsersComponent = (function () {
    function UsersComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.mode = 'Observable';
        this.hidden = true;
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    UsersComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers()
            .subscribe(function (users) { return _this.users = users; }, function (error) { return _this.errorMessage = error; });
    };
    UsersComponent.prototype.toggleUsers = function () {
        this.hidden = (this.hidden === true) ? false : true;
    };
    UsersComponent.prototype.saveJwt = function (jwt) {
        if (jwt) {
            window.localStorage.setItem('token', jwt);
        }
    };
    return UsersComponent;
}());
UsersComponent = __decorate([
    core_1.Component({
        selector: 'users',
        templateUrl: './users.component.html',
        styleUrls: ['./users.component.css'],
        providers: [user_service_1.UserService]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        router_1.Router])
], UsersComponent);
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map