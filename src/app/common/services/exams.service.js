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
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var common_service_1 = require("./common.service");
var ExamService = (function (_super) {
    __extends(ExamService, _super);
    function ExamService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.examsUrl = 'exams/';
        _this.examPapersUrl = _this.examsUrl + 'papers/';
        _this.examResultsUrl = _this.examsUrl + 'papers/';
        return _this;
    }
    ExamService.prototype.getExamResults = function () {
        return this.makeRequest(this.examResultsUrl, 'GET');
    };
    ExamService.prototype.createExamResult = function (exam, subject, start_time, duration, total_mark, csv_file) {
        if (exam === void 0) { exam = null; }
        if (subject === void 0) { subject = null; }
        if (start_time === void 0) { start_time = null; }
        if (csv_file === void 0) { csv_file = null; }
        return this.makeRequest(this.examResultsUrl, 'POST', { exam: exam, subject: subject, start_time: start_time, duration: duration, total_mark: total_mark, csv_file: csv_file });
    };
    ExamService.prototype.getExamResult = function (id) {
        id += '/';
        return this.makeRequest(this.examResultsUrl + id, 'GET');
    };
    ExamService.prototype.getExamPapers = function () {
        return this.makeRequest(this.examPapersUrl, 'GET');
    };
    ExamService.prototype.createExamPaper = function (exam, subject, start_time, duration, total_mark, csv_file) {
        if (exam === void 0) { exam = null; }
        if (subject === void 0) { subject = null; }
        if (start_time === void 0) { start_time = null; }
        if (csv_file === void 0) { csv_file = null; }
        return this.makeRequest(this.examPapersUrl, 'POST', { exam: exam, subject: subject, start_time: start_time, duration: duration, total_mark: total_mark, csv_file: csv_file });
    };
    ExamService.prototype.getExamPaper = function (id) {
        id += '/';
        return this.makeRequest(this.examPapersUrl + id, 'GET');
    };
    ExamService.prototype.getExams = function () {
        return this.makeRequest(this.examsUrl, 'GET');
    };
    ExamService.prototype.createExam = function (name, class_level, description, start_date, end_date, done) {
        if (name === void 0) { name = null; }
        if (class_level === void 0) { class_level = null; }
        if (description === void 0) { description = null; }
        if (start_date === void 0) { start_date = null; }
        if (end_date === void 0) { end_date = null; }
        if (done === void 0) { done = false; }
        return this.makeRequest(this.examsUrl, 'POST', { name: name, class_level: class_level, description: description, start_date: start_date, end_date: end_date, done: done });
    };
    ExamService.prototype.getExam = function (id) {
        id += '/';
        return this.makeRequest(this.examsUrl + id, 'GET');
    };
    return ExamService;
}(common_service_1.CommonService));
ExamService = __decorate([
    core_1.Injectable()
], ExamService);
exports.ExamService = ExamService;
//# sourceMappingURL=exams.service.js.map