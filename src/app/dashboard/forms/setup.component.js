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
/**
 * Created by saruni on 8/14/17.
 */
require("rxjs/add/operator/catch");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_service_1 = require("../../common/services/user.service");
var common_service_1 = require("../../common/services/common.service");
var institutions_service_1 = require("../../common/services/institutions.service");
var SetupComponent = (function () {
    // FIXME: Error message being show before the request.institution loads
    function SetupComponent(userService, commonService, institutionService, router) {
        this.userService = userService;
        this.commonService = commonService;
        this.institutionService = institutionService;
        this.router = router;
        this.requestSubmitted = false;
        this.showErrorMessage = false;
    }
    SetupComponent.prototype.ngOnInit = function () {
        this.getUser();
        this.getInstitutions();
        this.getJoinRequests();
        $(document).ready(function () {
            $('#searchInstitutions')
                .dropdown();
            $('#searchInstitutions1')
                .dropdown();
        });
    };
    SetupComponent.prototype.getJoinRequests = function () {
        var _this = this;
        this.userService.getJoinRequests()
            .subscribe(function (requests) { return _this.requests = requests; }, function (error) { return _this.errorMessage = error.message; });
    };
    SetupComponent.prototype.getInstitutions = function () {
        var _this = this;
        this.institutionService.getInstitutions()
            .subscribe(function (institutions) { return _this.institutions = institutions; }, function (error) { return _this.errorMessage = error.message; });
    };
    SetupComponent.prototype.selectInstitution = function (institution) {
        this.selectedInstitution = institution;
    };
    SetupComponent.prototype.joinInstitution = function () {
        var _this = this;
        // FIXME: Cleverly redirect user to dashboard on creating a join request
        for (var _i = 0, _a = this.requests; _i < _a.length; _i++) {
            var req = _a[_i];
            if (req.created_by.id === this.user.id) {
                this.requestSubmitted = true;
                this.request = req;
                return;
            }
        }
        this.userService.createInstitutionJoinRequest(this.selectedInstitution.id, this.notes)
            .subscribe(function (data) {
            _this.request = data;
            _this.requestSubmitted = true;
        }, handleJoinError);
        function handleJoinError(error) {
            if (error.status === 400) {
                console.log(error);
            }
        }
        // this.router.navigate(['dashboard'])
        // window.location.reload();
    };
    SetupComponent.prototype.getUser = function () {
        var _this = this;
        var jwtHelper = new common_service_1.JwtHelper();
        var errorMessage;
        var token = this.commonService.getJwtToken();
        var user = jwtHelper.decodeToken(token);
        this.userService.getUser(user.user_id)
            .subscribe(function (user) { return _this.user = user; }, function (error) { return errorMessage = error; });
    };
    SetupComponent.prototype.closeSetupModal = function () {
        $('.modal').transition('slide out');
        this.router.navigate(['dashboard']);
    };
    return SetupComponent;
}());
SetupComponent = __decorate([
    core_1.Component({
        selector: 'setup',
        templateUrl: './setup.component.html',
        styleUrls: [
            './setup.component.css'
        ]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        common_service_1.CommonService,
        institutions_service_1.InstitutionService,
        router_1.Router])
], SetupComponent);
exports.SetupComponent = SetupComponent;
//# sourceMappingURL=setup.component.js.map