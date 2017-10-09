/**
 * Created by saruni on 9/18/17.
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
var ParentsComponent = (function () {
    function ParentsComponent(divisionService) {
        this.divisionService = divisionService;
    }
    ParentsComponent.prototype.ngOnInit = function () {
        $(document).ready(function () {
            $('.ui.accordion').accordion({
                duration: 1000
            });
        });
        this.getParents();
    };
    ParentsComponent.prototype.getParents = function () {
        var _this = this;
        this.divisionService.getParents()
            .subscribe(function (parents) {
            _this.contentReady = true;
            _this.parents = parents;
        }, function (error) { return alert(error); });
    };
    ParentsComponent.prototype.searchParents = function (event) {
        var _this = this;
        this.searchTextEmpty = false;
        if (this.searchText !== '' || this.searchText === null) {
            this.contentReady = false;
            this.divisionService.getParents(this.searchText)
                .subscribe(function (parents) {
                _this.contentReady = true;
                _this.parents = parents;
            }, function (error) { return alert(error); });
        }
        else {
            this.searchTextEmpty = true;
        }
    };
    ParentsComponent.prototype.hideCards = function () {
        this.getParents();
        $('.dimmable.segment').transition({
            animation: 'slide',
            duration: 1000,
        });
    };
    return ParentsComponent;
}());
ParentsComponent = __decorate([
    core_1.Component({
        selector: 'parents',
        templateUrl: './parents.component.html',
        styleUrls: ['./parents.component.css']
    }),
    __metadata("design:paramtypes", [divisions_service_1.DivisionService])
], ParentsComponent);
exports.ParentsComponent = ParentsComponent;
//# sourceMappingURL=parents.component.js.map