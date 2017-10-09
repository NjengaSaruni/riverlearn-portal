/**
 * Created by saruni on 5/25/17.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var common_service_1 = require("./common.service");
var InstitutionService = (function (_super) {
    __extends(InstitutionService, _super);
    function InstitutionService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.institutionsUrl = 'institutions/';
        _this.institutionTypesUrl = _this.institutionsUrl + 'types/';
        return _this;
    }
    InstitutionService.prototype.getInstitutions = function () {
        return this.makeRequest(this.institutionsUrl, 'GET');
    };
    InstitutionService.prototype.getInstitution = function (id) {
        id += '/';
        return this.makeRequest(this.institutionsUrl + id, 'GET');
    };
    InstitutionService.prototype.createInstitution = function (name, motto, mobile, email, website, postal_address, type, domain, logo) {
        if (name === void 0) { name = ''; }
        if (motto === void 0) { motto = ''; }
        if (mobile === void 0) { mobile = ''; }
        if (email === void 0) { email = ''; }
        if (website === void 0) { website = ''; }
        if (postal_address === void 0) { postal_address = ''; }
        if (type === void 0) { type = ''; }
        if (domain === void 0) { domain = ''; }
        if (logo === void 0) { logo = null; }
        var input = new FormData();
        input.append('name', name);
        input.append('motto', motto);
        input.append('mobile', mobile);
        input.append('email', email);
        input.append('website', website);
        input.append('postal_address', postal_address);
        input.append('type', type);
        input.append('domain', domain);
        input.append('logo', logo);
        return this.makeRequest(this.institutionsUrl, 'POST', input);
    };
    InstitutionService.prototype.getInstitutionTypes = function () {
        return this.makeRequest(this.institutionTypesUrl, 'GET');
    };
    return InstitutionService;
}(common_service_1.CommonService));
InstitutionService = __decorate([
    core_1.Injectable()
], InstitutionService);
exports.InstitutionService = InstitutionService;
//# sourceMappingURL=institutions.service.js.map