/**
 * Created by saruni on 7/28/17.
 */
"use strict";
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./dashboard.component");
var sample_graphs_component_1 = require("./sample-graphs.component");
var user_detail_component_1 = require("./user-detail.component");
var students_component_1 = require("./students.component");
var teachers_component_1 = require("./teachers.component");
var management_component_1 = require("./management.component");
var feed_component_1 = require("./feed.component");
var dashboard_main_component_1 = require("./dashboard-main.component");
var auth_guard_service_1 = require("../common/services/auth-guard.service");
var requests_component_1 = require("./requests.component");
var institution_component_1 = require("./institution.component");
var student_form_component_1 = require("./student-form.component");
var parents_component_1 = require("./parents.component");
var parent_form_component_1 = require("./parent-form.component");
var teacher_form_component_1 = require("./teacher-form.component");
var dashboardRoutes = [
    // FIXME: Forms are added on top of current route
    {
        path: '', component: dashboard_component_1.DashboardComponent,
        canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            {
                path: '',
                children: [
                    { path: 'profile', component: user_detail_component_1.UserDetailComponent },
                    { path: 'graphs', component: sample_graphs_component_1.SampleGraphsComponent },
                    { path: 'students', component: students_component_1.StudentsComponent },
                    { path: 'teachers', component: teachers_component_1.TeachersComponent },
                    { path: 'parents', component: parents_component_1.ParentsComponent },
                    {
                        path: 'management',
                        component: management_component_1.ManagementComponent,
                        canActivate: [auth_guard_service_1.AdminGuard]
                    },
                    {
                        path: 'institution',
                        component: institution_component_1.InstitutionComponent
                    },
                    {
                        path: 'requests',
                        component: requests_component_1.RequestsComponent,
                    },
                    {
                        path: 'forms',
                        loadChildren: 'app/dashboard/forms/forms.module#FormModule',
                    },
                    {
                        path: 'exams',
                        loadChildren: 'app/dashboard/exams/exams.module#ExamsModule',
                    },
                    { path: '', redirectTo: '/dashboard/graphs', pathMatch: 'full' },
                ]
            }
        ]
    },
];
exports.routing = router_1.RouterModule.forChild(dashboardRoutes);
exports.dashboardComponents = [
    dashboard_component_1.DashboardComponent,
    dashboard_main_component_1.DashboardMainComponent,
    institution_component_1.InstitutionComponent,
    feed_component_1.FeedComponent,
    management_component_1.ManagementComponent,
    parents_component_1.ParentsComponent,
    parent_form_component_1.ParentFormComponent,
    requests_component_1.RequestsComponent,
    sample_graphs_component_1.SampleGraphsComponent,
    students_component_1.StudentsComponent,
    teachers_component_1.TeachersComponent,
    teacher_form_component_1.TeacherFormComponent,
    user_detail_component_1.UserDetailComponent,
    student_form_component_1.StudentFormComponent,
];
//# sourceMappingURL=dashboard-routing.module.js.map