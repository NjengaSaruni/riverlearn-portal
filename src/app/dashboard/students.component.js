/**
 * Created by saruni on 7/31/17.
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
var divisions_service_1 = require("../common/services/divisions.service");
var user_service_1 = require("../common/services/user.service");
var StudentsComponent = (function () {
    function StudentsComponent(divisionService, userService) {
        this.divisionService = divisionService;
        this.userService = userService;
    }
    StudentsComponent.prototype.ngOnInit = function () {
        this.getStudents();
        this.getUser();
        $(document).ready(function () {
            $('.ui.dropdown').dropdown();
            $('.ui.accordion').accordion();
        });
    };
    StudentsComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getLoggedInUser()
            .subscribe(function (user) { return _this.user = user; }, function (error) { return alert(error); });
    };
    StudentsComponent.prototype.getStudents = function () {
        var _this = this;
        this.contentReady = false;
        this.divisionService.getStudents()
            .subscribe(function (students) {
            _this.contentReady = true;
            _this.students = students;
        }, function (error) { return alert(error); });
    };
    StudentsComponent.prototype.toggleStudentsTable = function () {
        this.studentsTableHidden ? this.studentsTableHidden = false : this.studentsTableHidden = true;
        this.studentFormButtonHidden ? this.studentFormButtonHidden = false : this.studentFormButtonHidden = true;
    };
    StudentsComponent.prototype.showSearchInput = function () {
        this.hideSearch = false;
        if (!$('.right.floated.input').hasClass('visible')) {
            $('.right.floated.input').transition('slide in');
        }
    };
    StudentsComponent.prototype.searchStudents = function (event) {
        var _this = this;
        this.searchTextEmpty = false;
        if (this.searchText !== '' || this.searchText === null) {
            this.contentReady = false;
            this.divisionService.getStudents(this.searchText)
                .subscribe(function (students) {
                _this.contentReady = true;
                _this.students = students;
            }, function (error) { return alert(error); });
        }
        else {
            this.searchTextEmpty = true;
        }
    };
    return StudentsComponent;
}());
StudentsComponent = __decorate([
    core_1.Component({
        selector: 'students',
        templateUrl: './students.component.html',
        styleUrls: ['./students.component.css']
    }),
    __metadata("design:paramtypes", [divisions_service_1.DivisionService,
        user_service_1.UserService])
], StudentsComponent);
exports.StudentsComponent = StudentsComponent;
//# sourceMappingURL=students.component.js.map