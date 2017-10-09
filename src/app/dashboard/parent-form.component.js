/**
 * Created by saruni on 9/20/17.
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
var forms_1 = require("@angular/forms");
var common_service_1 = require("../common/services/common.service");
var users_models_1 = require("../common/models/users.models");
var user_service_1 = require("../common/services/user.service");
var divisions_service_1 = require("../common/services/divisions.service");
var ParentFormComponent = (function () {
    function ParentFormComponent(formBuilder, userService, divisionService) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.divisionService = divisionService;
        this.errors = [];
        this.genders = [
            {
                value: 'M',
                name: 'MALE'
            },
            {
                value: 'F',
                name: 'FEMALE'
            },
            {
                value: 'O',
                name: 'OTHER'
            }
        ];
    }
    ParentFormComponent.prototype.ngOnInit = function () {
        this.getUsers();
        this.getClasses();
        this.getStudents();
        $(document).ready(function () {
            $('.ui.dropdown').dropdown();
            $('.ui.accordion').accordion();
            $('#search-parents')
                .popup({
                inline: true,
                position: 'bottom left',
                on: 'click',
                delay: {
                    show: 300,
                    hide: 800
                }
            });
        });
        this.parentForm = this.formBuilder.group({
            first_name: ['', forms_1.Validators.required],
            middle_name: '',
            last_name: ['', forms_1.Validators.required],
            username: ['',
                [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(3),
                ]
            ],
            password: ['', forms_1.Validators.required],
            students: [[], forms_1.Validators.required],
            gender: ['', forms_1.Validators.required],
            email: [''],
        });
    };
    ParentFormComponent.prototype.ngAfterViewInit = function () {
        this.contentReady = true;
    };
    ParentFormComponent.prototype.onKey = function (event) {
        // Compare username with those from database
        var value;
        if (event.target.name === 'username') {
            this.usernameTouched = true;
            value = event.target.value.toLowerCase();
        }
        else if (!this.usernameTouched) {
            this.parentForm.patchValue({
                username: this.parentForm.get('first_name').value.toLowerCase().split(' ')[0] + this.parentForm.get('last_name').value.toLowerCase().split(' ')[0]
            });
            value = this.parentForm.get('username').value.toLowerCase();
        }
        this.compareUsernames(value);
    };
    ParentFormComponent.prototype.compareUsernames = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var nameRegex, _i, _a, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.comparingUsernames = true;
                        this.getUsers();
                        nameRegex = /^(\w){1,15}$/;
                        this.incorrectUsernameFormat = !value.match(nameRegex);
                        return [4 /*yield*/, common_service_1.delay(50)];
                    case 1:
                        _b.sent();
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
    ParentFormComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers()
            .subscribe(function (users) { return _this.users = users; }, function (error) { return alert(error); });
    };
    ParentFormComponent.prototype.getStudents = function () {
        var _this = this;
        this.divisionService.getStudents()
            .subscribe(function (students) { return _this.students = students; }, function (error) { return alert(error); });
    };
    ParentFormComponent.prototype.getClasses = function () {
        var _this = this;
        this.divisionService.getClasses()
            .subscribe(function (classes) { return _this.classes = classes; }, function (error) { return alert(error); });
    };
    ParentFormComponent.prototype.createParent = function () {
        var user = new users_models_1.User();
        user.username = this.parentForm.get('username').value;
        user.first_name = this.parentForm.get('first_name').value;
        user.last_name = this.parentForm.get('last_name').value;
        user.middle_name = this.parentForm.get('middle_name').value;
        user.password = this.parentForm.get('password').value;
        user.gender = this.parentForm.get('gender').value;
        user.email = this.parentForm.get('email').value;
        var students = this.parentForm.get('students').value;
        this.divisionService.createParent(user, students)
            .subscribe(function (parent) {
            $('#parent-created').modal('show');
        }, function (error) { return alert(error); });
    };
    ParentFormComponent.prototype.showSelectedStudents = function () {
        this.selectedStudents = [];
        this.errors = [];
        var _loop_1 = function (student) {
            student = this_1.students.find(function (std) { return std.id === student; });
            if (student.parent !== null) {
                var error = student.user.first_name + '\'s parent has already to ' + student.parent.user.last_name;
                this_1.errors.push(error);
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.parentForm.get('students').value; _i < _a.length; _i++) {
            var student = _a[_i];
            _loop_1(student);
        }
    };
    return ParentFormComponent;
}());
ParentFormComponent = __decorate([
    core_1.Component({
        selector: 'parent-form',
        templateUrl: './parent-form.component.html',
        styleUrls: ['./parent-form.component.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        user_service_1.UserService,
        divisions_service_1.DivisionService])
], ParentFormComponent);
exports.ParentFormComponent = ParentFormComponent;
//# sourceMappingURL=parent-form.component.js.map