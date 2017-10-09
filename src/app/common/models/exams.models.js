"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common_models_1 = require("./common.models");
/**
 * Created by saruni on 8/13/17.
 */
var Exam = (function (_super) {
    __extends(Exam, _super);
    function Exam() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.end_date = Date;
        return _this;
    }
    return Exam;
}(common_models_1.AbstractBase));
exports.Exam = Exam;
var ExamPaper = (function (_super) {
    __extends(ExamPaper, _super);
    function ExamPaper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ExamPaper;
}(common_models_1.AbstractBase));
exports.ExamPaper = ExamPaper;
var StudentPaperPerformance = (function (_super) {
    __extends(StudentPaperPerformance, _super);
    function StudentPaperPerformance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StudentPaperPerformance;
}(common_models_1.AbstractBase));
exports.StudentPaperPerformance = StudentPaperPerformance;
var Result = (function (_super) {
    __extends(Result, _super);
    function Result() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Result;
}(common_models_1.AbstractBase));
exports.Result = Result;
//# sourceMappingURL=exams.models.js.map