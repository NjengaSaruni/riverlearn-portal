/**
 * Created by saruni on 8/13/17.
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
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var common_service_1 = require("./common.service");
var DivisionService = (function (_super) {
    __extends(DivisionService, _super);
    function DivisionService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.divisionsUrl = 'divisions/';
        _this.levelsUrl = _this.divisionsUrl + 'levels/';
        _this.streamsUrl = _this.divisionsUrl + 'streams/';
        _this.classesUrl = _this.divisionsUrl + 'classes/';
        _this.studentsUrl = _this.divisionsUrl + 'students/';
        _this.parentsUrl = _this.divisionsUrl + 'parents/';
        _this.teachersUrl = _this.divisionsUrl + 'teachers/';
        _this.subjectsUrl = _this.divisionsUrl + 'subjects/';
        return _this;
    }
    DivisionService.prototype.getTeachers = function () {
        return this.makeRequest(this.teachersUrl, 'GET');
    };
    DivisionService.prototype.createTeacher = function (user, subjects) {
        if (user === void 0) { user = null; }
        if (subjects === void 0) { subjects = []; }
        return this.makeRequest(this.teachersUrl, 'POST', { user: user, subjects: subjects });
    };
    DivisionService.prototype.getTeacher = function (id) {
        id += '/';
        return this.makeRequest(this.teachersUrl + id, 'GET');
    };
    DivisionService.prototype.getParents = function (q) {
        if (q === void 0) { q = null; }
        var params = new http_1.URLSearchParams();
        params.set('q', q);
        return this.makeRequest(this.parentsUrl, 'GET', null, params);
    };
    DivisionService.prototype.createParent = function (user, students, token) {
        if (user === void 0) { user = null; }
        if (students === void 0) { students = null; }
        if (token === void 0) { token = null; }
        return this.makeRequest(this.parentsUrl, 'POST', { user: user, students: students, token: token });
    };
    DivisionService.prototype.getParent = function (id) {
        id += '/';
        return this.makeRequest(this.parentsUrl + id, 'POST');
    };
    DivisionService.prototype.getStudents = function (q) {
        if (q === void 0) { q = null; }
        var params = new http_1.URLSearchParams();
        params.set('q', q);
        return this.makeRequest(this.studentsUrl, 'GET', null, params);
    };
    DivisionService.prototype.createStudent = function (user, current_class, registration_number, parent) {
        if (user === void 0) { user = null; }
        if (current_class === void 0) { current_class = null; }
        if (registration_number === void 0) { registration_number = null; }
        if (parent === void 0) { parent = null; }
        return this.makeRequest(this.studentsUrl, 'POST', { user: user, current_class: current_class, registration_number: registration_number, parent: parent });
    };
    DivisionService.prototype.getStudent = function (id) {
        id += '/';
        return this.makeRequest(this.studentsUrl + id, 'GET');
    };
    DivisionService.prototype.getClasses = function () {
        return this.makeRequest(this.classesUrl, 'GET');
    };
    DivisionService.prototype.createClass = function (stream, level, class_teacher) {
        if (class_teacher === void 0) { class_teacher = null; }
        return this.makeRequest(this.classesUrl, 'POST', { stream: stream, level: level, class_teacher: class_teacher });
    };
    DivisionService.prototype.getClass = function (id) {
        id += '/';
        return this.makeRequest(this.classesUrl + id, 'GET');
    };
    DivisionService.prototype.getLevels = function () {
        return this.makeRequest(this.levelsUrl, 'GET');
    };
    DivisionService.prototype.createLevel = function (name, value) {
        return this.makeRequest(this.levelsUrl, 'POST', { name: name, value: value });
    };
    DivisionService.prototype.getLevel = function (id) {
        id += '/';
        return this.makeRequest(this.levelsUrl + id, 'GET');
    };
    DivisionService.prototype.getStreams = function () {
        return this.makeRequest(this.streamsUrl, 'GET');
    };
    DivisionService.prototype.createStream = function (name, color, description) {
        if (description === void 0) { description = ''; }
        return this.makeRequest(this.streamsUrl, 'POST', { name: name, description: description, color: color });
    };
    DivisionService.prototype.deleteStream = function (id) {
        id += '/';
        return this.makeRequest(this.streamsUrl + id, 'DELETE');
    };
    DivisionService.prototype.getStream = function (id) {
        id += '/';
        return this.makeRequest(this.streamsUrl + id, 'GET');
    };
    DivisionService.prototype.getSubjects = function () {
        return this.makeRequest(this.subjectsUrl, 'GET');
    };
    DivisionService.prototype.createSubject = function (field, name) {
        return this.makeRequest(this.subjectsUrl, 'POST', { name: name, field: field });
    };
    DivisionService.prototype.deleteSubject = function (id) {
        id += '/';
        return this.makeRequest(this.subjectsUrl + id, 'DELETE');
    };
    DivisionService.prototype.getSubject = function (id) {
        id += '/';
        return this.makeRequest(this.subjectsUrl + id, 'GET');
    };
    return DivisionService;
}(common_service_1.CommonService));
DivisionService = __decorate([
    core_1.Injectable()
], DivisionService);
exports.DivisionService = DivisionService;
//# sourceMappingURL=divisions.service.js.map