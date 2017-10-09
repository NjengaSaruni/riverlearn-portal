/**
 * Created by saruni on 8/16/17.
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
var TeachersComponent = (function () {
    function TeachersComponent(divisionService) {
        this.divisionService = divisionService;
    }
    TeachersComponent.prototype.ngOnInit = function () {
        this.getTeachers();
    };
    TeachersComponent.prototype.getTeachers = function () {
        var _this = this;
        this.contentReady = false;
        this.divisionService.getTeachers()
            .subscribe(function (teachers) {
            _this.contentReady = true;
            _this.teachers = teachers;
        }, function (error) { return alert(error); });
    };
    TeachersComponent.prototype.hideCards = function () {
        this.getTeachers();
        $('.dimmable.segment').transition({
            animation: 'slide',
            duration: 500
        });
    };
    return TeachersComponent;
}());
TeachersComponent = __decorate([
    core_1.Component({
        selector: 'teachers',
        templateUrl: './teachers.component.html',
        styleUrls: ['./teachers.component.css']
    }),
    __metadata("design:paramtypes", [divisions_service_1.DivisionService])
], TeachersComponent);
exports.TeachersComponent = TeachersComponent;
//# sourceMappingURL=teachers.component.js.map