/**
 * Created by saruni on 10/5/17.
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
var core_1 = require("@angular/core");
var exams_service_1 = require("../../common/services/exams.service");
var ExamScheduleFormComponent = (function () {
    function ExamScheduleFormComponent(examService) {
        this.examService = examService;
        this.contentReady = false;
    }
    ExamScheduleFormComponent.prototype.ngOnInit = function () {
        this.getExams();
    };
    ExamScheduleFormComponent.prototype.getExams = function () {
        var _this = this;
        this.examService.getExams()
            .subscribe(function (exams) {
            _this.contentReady = true;
            _this.exams = exams;
        }, function (error) { return alert(error); });
    };
    return ExamScheduleFormComponent;
}());
ExamScheduleFormComponent = __decorate([
    core_1.Component({
        selector: 'exam-schedule-form',
        templateUrl: './exam-schedule-form.component.html',
        styleUrls: ['./exam-schedule-form.component.css']
    }),
    __metadata("design:paramtypes", [exams_service_1.ExamService])
], ExamScheduleFormComponent);
exports.ExamScheduleFormComponent = ExamScheduleFormComponent;
//# sourceMappingURL=exam-schedule-form.component.js.map