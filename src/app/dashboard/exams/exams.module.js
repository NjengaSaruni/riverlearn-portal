/**
 * Created by saruni on 9/24/17.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ng2_charts_1 = require("ng2-charts");
var forms_1 = require("@angular/forms");
var auth_guard_service_1 = require("../../common/services/auth-guard.service");
var exams_service_1 = require("../../common/services/exams.service");
var exams_routing_module_1 = require("./exams-routing.module");
var ExamsModule = (function () {
    function ExamsModule() {
    }
    return ExamsModule;
}());
ExamsModule = __decorate([
    core_1.NgModule({
        imports: [
            ng2_charts_1.ChartsModule,
            common_1.CommonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            exams_routing_module_1.examRoutingModule,
        ],
        providers: [
            exams_service_1.ExamService,
            auth_guard_service_1.AdminGuard
        ],
        declarations: [
            exams_routing_module_1.examComponents
        ],
    })
], ExamsModule);
exports.ExamsModule = ExamsModule;
//# sourceMappingURL=exams.module.js.map