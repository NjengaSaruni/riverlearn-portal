/**
 * Created by saruni on 8/23/17.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_service_1 = require("./common.service");
var user_service_1 = require("./user.service");
var AuthGuard = (function (_super) {
    __extends(AuthGuard, _super);
    function AuthGuard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var url = state.url;
        return this.checkLogin(url);
    };
    AuthGuard.prototype.checkLogin = function (url) {
        if (this.isLoggedIn) {
            return true;
        }
        // TODO: ensure loaded module contains required user.
        // Navigate to the login page with extras
        this.router.navigate(['/login-page'], { queryParams: { url: url } });
    };
    return AuthGuard;
}(common_service_1.CommonService));
AuthGuard = __decorate([
    core_1.Injectable()
], AuthGuard);
exports.AuthGuard = AuthGuard;
var AdminGuard = (function (_super) {
    __extends(AdminGuard, _super);
    function AdminGuard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdminGuard.prototype.canActivate = function (route, state) {
        var url = route.url.toString();
        return this.checkIsAdmin(url);
    };
    AdminGuard.prototype.checkIsAdmin = function (url) {
        return this.fetchLoggedInUser().is_admin;
    };
    return AdminGuard;
}(user_service_1.UserService));
AdminGuard = __decorate([
    core_1.Injectable()
], AdminGuard);
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=auth-guard.service.js.map