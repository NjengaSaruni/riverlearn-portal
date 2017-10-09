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
/**
 * Created by saruni on 4/18/17.
 */
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var user_service_1 = require("../common/services/user.service");
var router_1 = require("@angular/router");
var common_service_1 = require("../common/services/common.service");
var RegisterComponent = (function () {
    function RegisterComponent(formBuilder, userService, router) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.router = router;
        this.serverErrorOccured = false;
        this.serverErrorMessage = 'The are problems connecting to our server.';
        this.serverErrorMessageTitle = 'Please try again later.';
        this.usernameTaken = true;
        this.comparingUsernames = false;
        this.incorrectUsernameFormat = false;
        this.passwordsMatch = true;
        this.usernameTouched = false;
        this.onCreateAccount = new core_1.EventEmitter();
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.getAccountTypes();
        this.getUsers();
        this.registerForm = this.formBuilder.group({
            username: ['',
                [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(3),
                ]
            ],
            email: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            password_again: ['', forms_1.Validators.required],
            account_type: [null, forms_1.Validators.required],
            first_name: ['', forms_1.Validators.required],
            middle_name: '',
            last_name: ['', forms_1.Validators.required],
            terms: [false, forms_1.Validators.required],
        });
        $(document).ready(function () {
            $('#selectAccountType')
                .dropdown();
        });
        $('input').popup();
    };
    RegisterComponent.prototype.onKey = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var value, nameRegex, _i, _a, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        value = this.registerForm.get('username').value.toLowerCase();
                        if (!(event.target.name === 'username')) return [3 /*break*/, 1];
                        this.usernameTouched = true;
                        value = event.target.value.toLowerCase();
                        return [3 /*break*/, 3];
                    case 1:
                        if (!!this.usernameTouched) return [3 /*break*/, 3];
                        return [4 /*yield*/, common_service_1.delay(300)];
                    case 2:
                        _b.sent();
                        this.registerForm.patchValue({
                            username: this.registerForm.get('first_name').value.toLowerCase().split(' ')[0] + this.registerForm.get('last_name').value.toLowerCase().split(' ')[0]
                        });
                        value = this.registerForm.get('username').value.toLowerCase();
                        _b.label = 3;
                    case 3:
                        nameRegex = /^(\w){1,15}$/;
                        this.incorrectUsernameFormat = !value.match(nameRegex);
                        this.comparingUsernames = true;
                        for (_i = 0, _a = this.users; _i < _a.length; _i++) {
                            user = _a[_i];
                            if (value === '' || value === user.username) {
                                this.usernameTaken = true;
                                break;
                            }
                            else {
                                this.usernameTaken = false;
                            }
                        }
                        this.comparingUsernames = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    RegisterComponent.prototype.onKeyEmail = function (event) {
        var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    };
    RegisterComponent.prototype.onKeyPasswordAgain = function (event) {
        if (event.target.value !== this.registerForm.get('password').value) {
            this.passwordsMatch = false;
        }
        else {
            this.passwordsMatch = true;
        }
    };
    RegisterComponent.prototype.createUser = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var username, password, first_name, last_name, middle_name, email, account_type;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = this.registerForm.get('username').value.toLowerCase();
                        password = this.registerForm.get('password').value;
                        first_name = this.registerForm.get('first_name').value;
                        last_name = this.registerForm.get('last_name').value;
                        middle_name = this.registerForm.get('middle_name').value;
                        email = this.registerForm.get('email').value;
                        account_type = this.registerForm.get('account_type').value;
                        this.value = this.userService.createUser(username, password, first_name, last_name, middle_name, email, account_type)
                            .subscribe(function (data) { return _this.loggedInUser = data; }, 
                        // TODO: Display error messages
                        common_service_1.handleError);
                        if (!!this.error) return [3 /*break*/, 2];
                        return [4 /*yield*/, common_service_1.delay(600)];
                    case 1:
                        _a.sent();
                        this.userService.auth(username, password)
                            .subscribe(function (data) {
                            _this.userService.saveJwt(data.token);
                            _this.onCreateAccount.emit(event);
                        }, function (error) { return _this.handleError; });
                        return [3 /*break*/, 3];
                    case 2:
                        console.log(this.error['status']);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RegisterComponent.prototype.handleError = function (error) {
        if (error.status >= 400) {
        }
        else if (error.status >= 500) {
            this.serverErrorOccured = true;
        }
    };
    RegisterComponent.prototype.redirectToTerms = function () {
        this.closeRegistrationModal();
        this.router.navigate(['/terms']);
    };
    RegisterComponent.prototype.getAccountTypes = function () {
        var _this = this;
        this.userService.getAccountTypes()
            .subscribe(function (accountTypes) { return _this.accountTypes = accountTypes; }, function (error) { return _this.errorMessage = error; });
    };
    RegisterComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers()
            .subscribe(function (users) { return _this.users = users; }, function (error) { return _this.errorMessage = error; });
    };
    RegisterComponent.prototype.closeOpenLogin = function () {
        $('#registerModal')
            .modal('hide');
        $('#loginModal')
            .modal('show');
    };
    RegisterComponent.prototype.closeRegistrationModal = function () {
        $('#registerModal')
            .modal('hide');
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: 'register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css'],
        outputs: ['onCreateAccount']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        user_service_1.UserService,
        router_1.Router])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map