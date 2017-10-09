/**
 * Created by saruni on 8/23/17.
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var core_1 = require("@angular/core");
var user_service_1 = require("../common/services/user.service");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var common_service_1 = require("../common/services/common.service");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var LoginPageComponent = (function () {
    function LoginPageComponent(userService, fb, route, router, titleService) {
        this.userService = userService;
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.titleService = titleService;
        this.loggedIn = false;
        this.loginErrorOccured = false;
        this.loggingIn = false;
        this.firstLoginAttempt = true;
        this.loginErrorMessage = 'Incorrect username or password.';
        this.loginErrorMessageTitle = 'Please try again.';
        this.serverErrorOccured = false;
        this.serverErrorMessage = 'The are problems connecting to our server.';
        this.serverErrorMessageTitle = 'Please try again later.';
        this.loginForm = this.fb.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            remember: [false]
        });
    }
    LoginPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.titleService.setTitle("RiverLearn - Login");
        this.route
            .queryParams
            .subscribe(function (params) {
            if (params['url']) {
                _this.redirectUrl = params['url'];
            }
            else {
                _this.redirectUrl = 'dashboard';
            }
        }, function (error) { return console.log(error); });
        $(document)
            .ready(function () {
            $('.ui.form')
                .form({
                fields: {
                    email: {
                        identifier: 'username',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Please enter your e-mail'
                            },
                            {
                                type: 'username',
                                prompt: 'Please enter a valid username'
                            }
                        ]
                    },
                    password: {
                        identifier: 'password',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Please enter your password'
                            },
                            {
                                type: 'length[6]',
                                prompt: 'Your password must be at least 6 characters'
                            }
                        ]
                    }
                }
            });
        });
        if ($('#main_menu').is(':visible')) {
            $('#main_menu').transition('slide out left');
        }
        if ($('#following_menu').is(':visible')) {
            $('#following_menu').transition('slide out left');
        }
        this.serverErrorOccured = false;
        this.loginErrorOccured = false;
        this.loggingIn = false;
    };
    LoginPageComponent.prototype.closeLoginErrorOccuredMessage = function () {
        this.loginErrorOccured = false;
        $('#logginErrorOccurredMessage')
            .transition('slide out');
    };
    LoginPageComponent.prototype.closeServerErrorOccuredMessage = function () {
        this.serverErrorOccured = false;
        $('#serverErrorOccurredMessage')
            .transition('slide out');
    };
    LoginPageComponent.prototype.closeOpenRegistration = function () {
        $('#loginModal')
            .modal('hide');
        $('#registerModal')
            .modal('show');
    };
    LoginPageComponent.prototype.auth = function (event) {
        var _this = this;
        // TODO display error messages
        this.firstLoginAttempt = false;
        var username = this.loginForm.get('username').value;
        var password = this.loginForm.get('password').value;
        var remember = this.loginForm.get('remember').value;
        this.userService.auth(username, password)
            .subscribe(function (data) {
            _this.token = data;
            $('#logginErrorOccurredMessage')
                .on('click', function () {
                $(this)
                    .closest('.message')
                    .transition('fade');
            });
            _this.userService.saveJwt(_this.token.token, remember, event);
            _this.router.navigate([_this.redirectUrl]);
            _this.loginErrorOccured = false;
            _this.serverErrorOccured = false;
            _this.loggingIn = true;
        }, function (error) { return _this.handleLoginError(error); }, function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, common_service_1.delay(3000)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    LoginPageComponent.prototype.handleLoginError = function (error) {
        if (error.status >= 400) {
            console.log(error);
            this.loginErrorOccured = true;
        }
        else {
            console.log(error);
            this.serverErrorOccured = true;
        }
        // this.errorMessage = error.status
        this.loggingIn = false;
    };
    return LoginPageComponent;
}());
LoginPageComponent = __decorate([
    core_1.Component({
        selector: 'login-page',
        templateUrl: './login-page.component.html',
        styleUrls: ['./login-page.component.css'],
        providers: [user_service_1.UserService],
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        forms_1.FormBuilder,
        router_1.ActivatedRoute,
        router_1.Router,
        platform_browser_1.Title])
], LoginPageComponent);
exports.LoginPageComponent = LoginPageComponent;
//# sourceMappingURL=login-page.component.js.map