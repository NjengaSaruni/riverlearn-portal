/**
 * Created by saruni on 5/25/17.
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
/**
 * Created by saruni on 5/18/17.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var InstitutionService = (function () {
    // private  institutionsUrl = 'http://35.187.27.188:8000/api/v1/institutions/';
    function InstitutionService(http) {
        this.http = http;
        this.institutionsUrl = 'http://0.0.0.0:8001/api/v1/institutions/';
    }
    InstitutionService.prototype.getInstitutions = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var jwt = localStorage.getItem('token');
        if (jwt) {
            headers.append('Authorization', 'Bearer ' + jwt);
        }
        return this.http.get(this.institutionsUrl, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
    };
    InstitutionService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    InstitutionService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    return InstitutionService;
}());
InstitutionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], InstitutionService);
exports.InstitutionService = InstitutionService;
//# sourceMappingURL=institutions.service.js.map