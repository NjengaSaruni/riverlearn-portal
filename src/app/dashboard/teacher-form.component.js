/**
 * Created by saruni on 9/23/17.
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
var TeacherFormComponent = (function () {
    function TeacherFormComponent(formBuilder, userService, divisionService) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.divisionService = divisionService;
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
    TeacherFormComponent.prototype.ngOnInit = function () {
        this.getUsers();
        this.getSubjects();
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
        this.teacherForm = this.formBuilder.group({
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
            gender: ['', forms_1.Validators.required],
            email: [''],
            subjects: [[], forms_1.Validators.required],
        });
    };
    TeacherFormComponent.prototype.ngAfterViewInit = function () {
        this.contentReady = true;
    };
    TeacherFormComponent.prototype.onKey = function (event) {
        // Compare username with those from database
        var value;
        if (event.target.name === 'username') {
            this.usernameTouched = true;
            value = event.target.value.toLowerCase();
        }
        else if (!this.usernameTouched) {
            this.teacherForm.patchValue({
                username: this.teacherForm.get('first_name').value.toLowerCase().split(' ')[0] + this.teacherForm.get('last_name').value.toLowerCase().split(' ')[0]
            });
            value = this.teacherForm.get('username').value.toLowerCase();
        }
        this.compareUsernames(value);
    };
    TeacherFormComponent.prototype.compareUsernames = function (value) {
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
    TeacherFormComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers()
            .subscribe(function (users) { return _this.users = users; }, function (error) { return alert(error); });
    };
    TeacherFormComponent.prototype.getSubjects = function () {
        var _this = this;
        this.divisionService.getSubjects()
            .subscribe(function (subjects) { return _this.subjects = subjects; }, function (error) { return alert(error); });
    };
    TeacherFormComponent.prototype.createTeacher = function () {
        var user = new users_models_1.User();
        user.username = this.teacherForm.get('username').value;
        user.first_name = this.teacherForm.get('first_name').value;
        user.last_name = this.teacherForm.get('last_name').value;
        user.middle_name = this.teacherForm.get('middle_name').value;
        user.password = this.teacherForm.get('password').value;
        user.gender = this.teacherForm.get('gender').value;
        user.email = this.teacherForm.get('email').value;
        var subjects = this.teacherForm.get('subjects').value;
        this.divisionService.createTeacher(user, subjects)
            .subscribe(function (teacher) {
            $('#teacher-created').modal('show');
        }, function (error) { return alert(error); });
    };
    return TeacherFormComponent;
}());
TeacherFormComponent = __decorate([
    core_1.Component({
        selector: 'teacher-form',
        templateUrl: './teacher-form.component.html',
        styleUrls: ['./teacher-form.component.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        user_service_1.UserService,
        divisions_service_1.DivisionService])
], TeacherFormComponent);
exports.TeacherFormComponent = TeacherFormComponent;
//# sourceMappingURL=teacher-form.component.js.map