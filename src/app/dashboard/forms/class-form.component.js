/**
 * Created by saruni on 9/10/17.
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
var user_service_1 = require("../../common/services/user.service");
var divisions_service_1 = require("../../common/services/divisions.service");
var forms_1 = require("@angular/forms");
var common_service_1 = require("../../common/services/common.service");
var ClassFormComponent = (function () {
    function ClassFormComponent(formBuilder, userService, divisionService) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.divisionService = divisionService;
    }
    ClassFormComponent.prototype.ngOnInit = function () {
        this.getUser();
        this.getLevels();
        this.getStreams();
        this.getTeachers();
        this.getClasses();
        // TODO: Edit delete classes
        $(document).ready(function () {
            $('.cards .card').dimmer({
                on: 'hover'
            });
            $('.ui.dropdown').dropdown();
            $('.ui.accordion').accordion();
        });
        this.classForm = this.formBuilder.group({
            level: ['', forms_1.Validators.required],
            stream: ['', forms_1.Validators.required],
            class_teacher: ['']
        });
    };
    ClassFormComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getLoggedInUser()
            .subscribe(function (user) { return _this.user = user; }, function (error) { return _this.errorMessage = error; });
    };
    ClassFormComponent.prototype.getLevels = function () {
        var _this = this;
        this.divisionService.getLevels()
            .subscribe(function (levels) { return _this.levels = levels; }, function (error) { return _this.errorMessage = error; });
    };
    ClassFormComponent.prototype.getStreams = function () {
        var _this = this;
        this.divisionService.getStreams()
            .subscribe(function (streams) { return _this.streams = streams; }, function (error) { return _this.errorMessage = error; });
    };
    ClassFormComponent.prototype.getTeachers = function () {
        var _this = this;
        this.divisionService.getTeachers()
            .subscribe(function (teachers) { return _this.teachers = teachers; }, function (error) { return _this.errorMessage = error; });
    };
    ClassFormComponent.prototype.getClasses = function () {
        var _this = this;
        this.divisionService.getClasses()
            .subscribe(function (classes) {
            _this.contentReady = true;
            _this.classes = classes;
        }, function (error) { return _this.errorMessage = error; });
    };
    ClassFormComponent.prototype.createClass = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var level, stream, class_teacher;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        level = this.classForm.get('level').value;
                        stream = this.classForm.get('stream').value;
                        class_teacher = this.classForm.get('class_teacher').value;
                        return [4 /*yield*/, common_service_1.delay(400)];
                    case 1:
                        _a.sent();
                        this.divisionService.createClass(stream, level, class_teacher)
                            .subscribe(function () {
                            _this.getClasses();
                            $('.ui.accordion.content').transition('slide out');
                        }, function (error) { return _this.errorMessage = error; });
                        return [2 /*return*/];
                }
            });
        });
    };
    ClassFormComponent.prototype.onSelectLevel = function (level) {
        this.selectedLevel = level;
    };
    return ClassFormComponent;
}());
ClassFormComponent = __decorate([
    core_1.Component({
        selector: 'class-form',
        templateUrl: './class-form.component.html',
        styleUrls: [
            './class-form.component.css'
        ]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        user_service_1.UserService,
        divisions_service_1.DivisionService])
], ClassFormComponent);
exports.ClassFormComponent = ClassFormComponent;
//# sourceMappingURL=class-form.component.js.map