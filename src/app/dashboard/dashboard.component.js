/**
 * Created by saruni on 4/9/17.
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
var router_1 = require("@angular/router");
var user_service_1 = require("../common/services/user.service");
var divisions_service_1 = require("../common/services/divisions.service");
var exams_service_1 = require("../common/services/exams.service");
var platform_browser_1 = require("@angular/platform-browser");
var DashboardComponent = (function () {
    function DashboardComponent(router, userService, divisionService, examService, titleService) {
        this.router = router;
        this.userService = userService;
        this.divisionService = divisionService;
        this.examService = examService;
        this.titleService = titleService;
        this.requestSubmitted = false;
        this.content = [
            { title: 'Kenya', description: 'Kenyans are tired of the same old story' },
            { title: 'United Arab Emirates' },
            { title: 'Afghanistan' },
        ];
    }
    DashboardComponent.prototype.reInitializeData = function () {
        this.getUser();
        this.getClasses();
        this.getStudents();
        this.getParents();
        this.getTeachers();
        this.getExams();
        this.getExamPapers();
        this.getExamResults();
        this.getJoinRequests();
        this.getInstitutionJoinRequests();
    };
    DashboardComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Dashboard");
        this.reInitializeData();
        // FIXME: DROPDOWN DOESNT WORK SOMETIMES
        $(document).ready(function () {
            $('.ui.dropdown').dropdown();
        });
        $('#studentsSelector').transition({
            animation: 'jiggle',
            duration: 3000
        });
        if ($('#loginModal').is(':visible')) {
            $('#loginModal').modal('hide');
        }
        if ($('#registerModal').is(':visible')) {
            $('#registerModal').modal('hide');
        }
        $('#search-box')
            .search({
            source: this.content
        });
        $('#following_menu').transition('slide out');
        $('#main_menu').transition('slide out');
        $(document).click(function (event) {
            if ($(event.target).is('#dashboard-sidebar, #sidebarIcon,#dashboard-sidebar *')) {
                return;
            }
            else if ($('#dashboard-sidebar').hasClass('visible')) {
                $('#dashboard-sidebar').transition('fade');
            }
        });
    };
    DashboardComponent.prototype.ngOnChanges = function () {
        this.reInitializeData();
    };
    DashboardComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getLoggedInUser()
            .subscribe(function (user) { return _this.user = user; }, function (error) { return _this.errorMessage = error; });
    };
    DashboardComponent.prototype.getJoinRequests = function () {
        var _this = this;
        this.userService.getJoinRequests()
            .subscribe(function (requests) { return _this.requests = requests; }, function (error) { return _this.errorMessage = error.message; });
    };
    DashboardComponent.prototype.getInstitutionJoinRequests = function () {
        var _this = this;
        this.userService.getInstitutionRequests()
            .subscribe(function (requests) { return _this.institutionRequests = requests; }, function (error) { return _this.errorMessage = error.message; });
    };
    DashboardComponent.prototype.requestHandler = function () {
        for (var _i = 0, _a = this.requests; _i < _a.length; _i++) {
            var req = _a[_i];
            if (req.created_by.id === this.user.id) {
                // TODO : Enable users to create remake other requests
                $('.ui.basic.modal').modal('show');
                this.requestSubmitted = true;
                this.request = req;
                break;
            }
        }
        if (!this.requestSubmitted) {
            this.router.navigate(['dashboard', 'forms', 'setup']);
        }
    };
    DashboardComponent.prototype.getClasses = function () {
        var _this = this;
        this.divisionService.getClasses()
            .subscribe(function (classes) { return _this.classes = classes; }, function (error) { return _this.handleLoginError(error); });
    };
    DashboardComponent.prototype.getStudents = function () {
        var _this = this;
        this.divisionService.getStudents()
            .subscribe(function (students) { return _this.students = students; }, function (error) { return _this.handleLoginError(error); });
    };
    DashboardComponent.prototype.getParents = function () {
        var _this = this;
        this.divisionService.getParents()
            .subscribe(function (parents) { return _this.parents = parents; }, function (error) { return _this.handleLoginError(error); });
    };
    DashboardComponent.prototype.getTeachers = function () {
        var _this = this;
        this.divisionService.getTeachers()
            .subscribe(function (teachers) { return _this.teachers = teachers; }, function (error) { return _this.handleLoginError(error); });
    };
    DashboardComponent.prototype.getExams = function () {
        var _this = this;
        this.examService.getExams()
            .subscribe(function (exams) { return _this.exams = exams; }, function (error) { return _this.handleLoginError(error); });
    };
    DashboardComponent.prototype.getExamPapers = function () {
        var _this = this;
        this.examService.getExamPapers()
            .subscribe(function (examPapers) { return _this.examPapers = examPapers; }, function (error) { return _this.handleLoginError(error); });
    };
    DashboardComponent.prototype.getExamResults = function () {
        var _this = this;
        this.examService.getExamResults()
            .subscribe(function (examResults) { return _this.examResults = examResults; }, function (error) { return _this.handleLoginError(error); });
    };
    DashboardComponent.prototype.getRequests = function () {
        var _this = this;
        this.examService.getExamResults()
            .subscribe(function (examResults) { return _this.examResults = examResults; }, function (error) { return _this.handleLoginError(error); });
    };
    DashboardComponent.prototype.handleLoginError = function (error) {
        if (error.status >= 500) {
            this.errorMessage = 'RiverLearn server is experiencing some problems. Please try again later.';
        }
        // this.errorMessage = error.status
    };
    DashboardComponent.prototype.showStudents = function () {
        this.getStudents();
        if ($('#studentCards').is(':visible')) {
            $('#studentCards .card').transition({
                animation: 'jiggle',
                duration: 300,
                interval: 50
            });
        }
    };
    DashboardComponent.prototype.showParents = function () {
        this.getParents();
        if ($('#parentsCards').is(':visible')) {
            $('#parentsCards .card').transition({
                animation: 'jiggle',
                duration: 300,
                interval: 50
            });
        }
    };
    DashboardComponent.prototype.showTeachers = function () {
        this.getTeachers();
        if ($('#teachersCards').is(':visible')) {
            $('#teacherssCards .card').transition({
                animation: 'jiggle',
                duration: 300,
                interval: 50
            });
        }
    };
    DashboardComponent.prototype.showClasses = function (event) {
        this.getClasses();
        this.router.navigate(['dashboard', 'forms', 'classes']);
    };
    DashboardComponent.prototype.showSideBar = function () {
        if ($('#dashboard-sidebar').hasClass('visible')) {
            return;
        }
        $('#dashboard-sidebar').transition('fade');
    };
    DashboardComponent.prototype.signOut = function () {
        this.userService.logout();
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        user_service_1.UserService,
        divisions_service_1.DivisionService,
        exams_service_1.ExamService,
        platform_browser_1.Title])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map