/**
 * Created by saruni on 8/24/17.
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var core_1 = require("@angular/core");
var user_service_1 = require("../common/services/user.service");
var common_service_1 = require("../common/services/common.service");
var RequestsComponent = (function () {
    function RequestsComponent(userService) {
        this.userService = userService;
    }
    RequestsComponent.prototype.ngOnInit = function () {
        this.getRequests();
    };
    RequestsComponent.prototype.getRequests = function () {
        var _this = this;
        this.userService.getInstitutionRequests('Teacher')
            .subscribe(function (requests) { return _this.teacherRequests = requests; }, function (error) { return console.log(error); });
        this.userService.getInstitutionRequests('Parent')
            .subscribe(function (requests) { return _this.parentRequests = requests; }, function (error) { return console.log(error); });
        this.userService.getInstitutionRequests('Student')
            .subscribe(function (requests) { return _this.studentRequests = requests; }, function (error) { return console.log(error); });
    };
    RequestsComponent.prototype.acceptRequest = function (request, event) {
        this.sendRequest(request, true);
        this.hideRow(request, event);
    };
    RequestsComponent.prototype.declineRequest = function (request, event) {
        this.sendRequest(request, false);
        this.hideRow(request, event);
    };
    RequestsComponent.prototype.hideRow = function (request, event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        $(event.target || event.srcElement).parents('tr').transition('slide out');
                        $(event.target || event.srcElement).parents('.card').transition('slide out');
                        return [4 /*yield*/, common_service_1.delay(300)];
                    case 1:
                        _a.sent();
                        if (request.created_by.account_type.name == 'Student') {
                            this.studentRequests = this.studentRequests.filter(function (item) { return item.id !== request.id; });
                        }
                        else if (request.created_by.account_type.name == 'Parent') {
                            this.parentRequests = this.parentRequests.filter(function (item) { return item.id !== request.id; });
                        }
                        else {
                            this.teacherRequests = this.teacherRequests.filter(function (item) { return item.id !== request.id; });
                        }
                        this.getRequests();
                        return [2 /*return*/];
                }
            });
        });
    };
    RequestsComponent.prototype.sendRequest = function (request, approved) {
        this.userService.patchRequest(request.id, approved).subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
    };
    return RequestsComponent;
}());
RequestsComponent = __decorate([
    core_1.Component({
        selector: 'requests',
        templateUrl: './requests.component.html',
        styleUrls: ['./requests.component.css']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" && _a || Object])
], RequestsComponent);
exports.RequestsComponent = RequestsComponent;
var _a;
//# sourceMappingURL=requests.component.js.map