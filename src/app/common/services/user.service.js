/**
 * Created by saruni on 4/9/17.
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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var common_service_1 = require("./common.service");
var UserService = (function (_super) {
    __extends(UserService, _super);
    function UserService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.authUrl = 'api-token-auth/';
        _this.usersUrl = 'users/';
        _this.createUsersUrl = _this.usersUrl + 'create/';
        _this.accountTypesUrl = _this.usersUrl + 'account_types/';
        _this.joinRequestsUrl = _this.usersUrl + 'join_requests/';
        return _this;
    }
    UserService.prototype.getUsers = function () {
        return this.makeRequest(this.usersUrl, 'GET');
    };
    UserService.prototype.getUser = function (id) {
        id += '/';
        return this.makeRequest(this.usersUrl + id, 'GET');
    };
    UserService.prototype.getLoggedInUser = function () {
        var jwtHelper = new common_service_1.JwtHelper();
        var token = this.getJwtToken();
        var user = jwtHelper.decodeToken(token);
        return this.getUser(user.user_id);
    };
    UserService.prototype.fetchLoggedInUser = function () {
        var _this = this;
        this.getLoggedInUser().subscribe(function (user) { return _this.user = user; });
        return this.user;
    };
    UserService.prototype.getAccountTypes = function () {
        return this.makeRequest(this.accountTypesUrl, 'GET');
    };
    UserService.prototype.login = function () {
        var _this = this;
        return Observable_1.Observable.of(true).delay(1000).do(function (val) { return _this.isLoggedIn = true; });
    };
    UserService.prototype.logout = function () {
        localStorage.clear();
        sessionStorage.clear();
        this.isLoggedIn = false;
        window.location.reload();
    };
    UserService.prototype.auth = function (username, password) {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        return this.makeRequest(this.authUrl, 'POST', { username: username, password: password });
    };
    UserService.prototype.saveJwt = function (jwt, remember, event) {
        if (remember === void 0) { remember = false; }
        if (event === void 0) { event = null; }
        if (jwt) {
            if (remember) {
                sessionStorage.setItem('token', jwt);
                localStorage.setItem('token', jwt);
            }
            else {
                localStorage.setItem('token', jwt);
            }
            this.isLoggedIn = true;
        }
    };
    UserService.prototype.createUser = function (username, password, first_name, last_name, middle_name, email, account_type) {
        return this.makeRequest(this.createUsersUrl, 'POST', { username: username, password: password, first_name: first_name, last_name: last_name, email: email, middle_name: middle_name, account_type: account_type });
    };
    UserService.prototype.getJoinRequests = function (type) {
        if (type === void 0) { type = null; }
        var params = new http_1.URLSearchParams();
        params.set('type', type);
        return this.makeRequest(this.joinRequestsUrl, 'GET', null, params);
    };
    UserService.prototype.patchRequest = function (id, approved) {
        id += '/';
        return this.makeRequest(this.joinRequestsUrl + id, 'PATCH', { approved: approved });
    };
    UserService.prototype.getInstitutionRequests = function (type) {
        var _this = this;
        if (type === void 0) { type = null; }
        this.getLoggedInUser().subscribe(function (user) { return _this.user = user; }, common_service_1.handleError);
        return this.getJoinRequests(type)
            .map(function (requests) { return requests.filter(function (request) { return request.institution.id === _this.user.institution.id; }); });
    };
    UserService.prototype.createInstitutionJoinRequest = function (institution, notes) {
        if (notes === void 0) { notes = null; }
        return this.makeRequest(this.joinRequestsUrl, 'POST', { institution: institution, notes: notes });
    };
    return UserService;
}(common_service_1.CommonService));
UserService = __decorate([
    core_1.Injectable()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map