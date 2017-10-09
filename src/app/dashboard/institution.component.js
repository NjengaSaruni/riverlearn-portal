/**
 * Created by saruni on 8/29/17.
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
var divisions_service_1 = require("../common/services/divisions.service");
var common_service_1 = require("../common/services/common.service");
var forms_1 = require("@angular/forms");
var InstitutionComponent = (function () {
    function InstitutionComponent(userService, divisionService, commonService, formBuilder) {
        this.userService = userService;
        this.divisionService = divisionService;
        this.commonService = commonService;
        this.formBuilder = formBuilder;
    }
    InstitutionComponent.prototype.ngOnInit = function () {
        this.streamForm = this.formBuilder.group({
            name: ['', forms_1.Validators.required],
        });
        this.subjectForm = this.formBuilder.group({
            name: ['', forms_1.Validators.required],
        });
        $('.ui.dropdown').dropdown();
        $('#addStreamButton')
            .popup({
            on: 'click',
            inline: true,
            hoverable: true,
            position: 'bottom left',
            delay: {
                show: 300,
                hide: 800
            }
        });
        $('#addSubjectButton')
            .popup({
            on: 'click',
            inline: true,
            hoverable: true,
            position: 'bottom left',
            delay: {
                show: 300,
                hide: 800
            }
        });
        this.getUser();
        this.getStreams();
        this.getColors();
        this.getSubjects();
        this.getFields();
    };
    InstitutionComponent.prototype.ngOnDestroy = function () {
    };
    InstitutionComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getLoggedInUser()
            .subscribe(function (user) { return _this.user = user; }, function (error) { return _this.errorMessage = error; });
    };
    InstitutionComponent.prototype.getStreams = function () {
        var _this = this;
        this.divisionService.getStreams()
            .subscribe(function (streams) { return _this.streams = streams; }, function (error) { return _this.errorMessage = error; });
    };
    InstitutionComponent.prototype.getColors = function () {
        var _this = this;
        this.commonService.getColors()
            .subscribe(function (colors) { return _this.colors = colors; }, function (error) { return _this.errorMessage = error; });
    };
    InstitutionComponent.prototype.getSubjects = function () {
        var _this = this;
        this.divisionService.getSubjects()
            .subscribe(function (subjects) { return _this.subjects = subjects; }, function (error) { return _this.errorMessage = error; });
    };
    InstitutionComponent.prototype.getFields = function () {
        var _this = this;
        this.commonService.getFields()
            .subscribe(function (fields) { return _this.fields = fields; }, function (error) { return _this.errorMessage = error; });
    };
    InstitutionComponent.prototype.onSelectColor = function (event, color) {
        this.selectedColor = color;
        $('#colors-modal').transition({
            animation: 'slide out'
        });
    };
    InstitutionComponent.prototype.onSelectField = function (event, field) {
        this.selectedField = field;
    };
    InstitutionComponent.prototype.setBorderColor = function (stream) {
        if (stream.color) {
            return {
                'border-bottom': '15px solid ' + stream.color.hex,
            };
        }
    };
    InstitutionComponent.prototype.createStream = function () {
        var _this = this;
        var name = this.streamForm.get('name').value;
        var color = null;
        if (this.selectedColor) {
            color = this.selectedColor.id.toString();
        }
        this.divisionService.createStream(name, color)
            .subscribe(function (stream) {
            _this.getStreams();
            $('#streamsLength').transition('jiggle');
            _this.streams.push(stream);
        }, function (error) { return _this.errorMessage = error; }, function () {
            _this.streamForm.setValue({ name: '' });
            $('#addStreamPopup').transition('slide up');
        });
    };
    InstitutionComponent.prototype.deleteStream = function (event, stream) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        $(event.target || event.srcElement).parents('tr').transition({
                            animation: 'fly left',
                            duration: 2000
                        });
                        return [4 /*yield*/, common_service_1.delay(1000)];
                    case 1:
                        _a.sent();
                        this.divisionService.deleteStream(stream.id.toString())
                            .subscribe(function (stream) {
                            for (var index in _this.streams) {
                                if (_this.streams[index].id == stream.id) {
                                    delete _this.streams[index];
                                    break;
                                }
                            }
                        }, function (error) { return _this.errorMessage = error; }, function () { return _this.getStreams(); });
                        return [2 /*return*/];
                }
            });
        });
    };
    InstitutionComponent.prototype.patchStream = function () {
        // TODO create patching code
    };
    InstitutionComponent.prototype.createSubject = function () {
        var _this = this;
        var name = this.subjectForm.get('name').value;
        var field = null;
        if (this.selectedField !== null) {
            field = this.selectedField.id.toString();
        }
        this.divisionService.createSubject(field, name)
            .subscribe(function (subject) {
            _this.getSubjects();
            $('#subjectsLength').transition('jiggle');
            _this.subjects.push(subject);
        }, function (error) { return _this.errorMessage = error; }, function () {
            _this.subjectForm.setValue({ name: '' });
            $('#addSubjectPopup').transition('slide up');
        });
    };
    InstitutionComponent.prototype.deleteSubject = function (event, subject) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        $(event.target || event.srcElement).parents('tr').transition({
                            animation: 'fly left',
                            duration: 2000
                        });
                        return [4 /*yield*/, common_service_1.delay(1000)];
                    case 1:
                        _a.sent();
                        this.divisionService.deleteSubject(subject.id.toString())
                            .subscribe(function (subject) {
                            for (var index in _this.subjects) {
                                if (_this.subjects[index].id == subject.id) {
                                    delete _this.subjects[index];
                                    break;
                                }
                            }
                        }, function (error) { return _this.errorMessage = error; }, function () { return _this.getSubjects(); });
                        return [2 /*return*/];
                }
            });
        });
    };
    InstitutionComponent.prototype.toggleStreamsModal = function () {
        $('#streamsModal').modal('toggle');
    };
    InstitutionComponent.prototype.toggleSubjectsModal = function () {
        $('#subjectsModal').modal('toggle');
    };
    return InstitutionComponent;
}());
InstitutionComponent = __decorate([
    core_1.Component({
        selector: 'institution',
        templateUrl: './institution.component.html',
        styleUrls: ['./institution.component.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        divisions_service_1.DivisionService,
        common_service_1.CommonService,
        forms_1.FormBuilder])
], InstitutionComponent);
exports.InstitutionComponent = InstitutionComponent;
//# sourceMappingURL=institution.component.js.map