/**
 * Created by saruni on 9/24/17.
 */
"use strict";
var router_1 = require("@angular/router");
var exams_component_1 = require("./exams.component");
var auth_guard_service_1 = require("../../common/services/auth-guard.service");
var exam_schedules_component_1 = require("./exam-schedules.component");
var exam_schedule_form_component_1 = require("./exam-schedule-form.component");
var examRoutes = [
    {
        path: '', component: exams_component_1.ExamsComponent,
        canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            {
                path: '',
                children: [
                    { path: 'schedules', component: exam_schedules_component_1.ExamSchedulesComponent },
                    { path: 'add', component: exam_schedule_form_component_1.ExamScheduleFormComponent },
                    { path: '', redirectTo: '/dashboard/exams/schedules', pathMatch: 'full' },
                ]
            }
        ]
    },
];
exports.examRoutingModule = router_1.RouterModule.forChild(examRoutes);
exports.examComponents = [
    exams_component_1.ExamsComponent,
    exam_schedule_form_component_1.ExamScheduleFormComponent,
    exam_schedules_component_1.ExamSchedulesComponent,
];
//# sourceMappingURL=exams-routing.module.js.map