/**
 * Created by saruni on 8/19/17.
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
var institutions_models_1 = require("../../common/models/institutions.models");
var institutions_service_1 = require("../../common/services/institutions.service");
var forms_1 = require("@angular/forms");
var common_service_1 = require("../../common/services/common.service");
var user_service_1 = require("../../common/services/user.service");
var router_1 = require("@angular/router");
var InstitutionFormComponent = (function () {
    function InstitutionFormComponent(formBuilder, institutionService, userService, commonService, router) {
        this.formBuilder = formBuilder;
        this.institutionService = institutionService;
        this.userService = userService;
        this.commonService = commonService;
        this.router = router;
        this.contentReady = false;
        this.selectedType = new institutions_models_1.InstitutionType();
        this.domainTaken = false;
        this.comparingDomains = false;
    }
    InstitutionFormComponent.prototype.ngOnInit = function () {
        this.getInstitutionTypes();
        this.getInstitutions();
        this.getUser();
        $(document).ready(function () {
            $('#selectInstitutionType')
                .dropdown();
            $('.ui.accordion').accordion();
        });
        this.institutionForm = this.formBuilder.group({
            name: ['', forms_1.Validators.required],
            domain: ['', forms_1.Validators.required],
            motto: [''],
            mobile: ['', forms_1.Validators.required],
            email: ['', forms_1.Validators.required],
            website: [''],
            logo: [''],
            address: this.formBuilder.group({
                postalAddress: [''],
                postalCode: [''],
                town: ['']
            }),
            type: [this.selectedType.name, forms_1.Validators.required],
            usePersonal: [false]
        });
    };
    InstitutionFormComponent.prototype.onKey = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var value, typeName, _i, _a, type;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.comparingDomains = true;
                        typeName = '';
                        for (_i = 0, _a = this.institutionTypes; _i < _a.length; _i++) {
                            type = _a[_i];
                            if (type.id === this.institutionForm.get('type').value) {
                                typeName = type.name;
                                break;
                            }
                        }
                        this.institutionForm.patchValue({
                            domain: this.institutionForm.get('name').value.toLowerCase().split(' ')[0] + typeName.split(' ')[0]
                        });
                        value = this.institutionForm.get('domain').value.toLowerCase();
                        return [4 /*yield*/, common_service_1.delay(30)];
                    case 1:
                        _b.sent();
                        this.institutions.forEach(function (institution, index) {
                            if (value === '' || value === institution.domain) {
                                _this.domainTaken = true;
                                value += index.toString();
                            }
                            else {
                                _this.domainTaken = false;
                            }
                        });
                        this.comparingDomains = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    InstitutionFormComponent.prototype.usePersonalContacts = function () {
        if (this.institutionForm.get('usePersonal').value) {
            this.institutionForm.patchValue({
                mobile: this.user.mobile,
                email: this.user.email
            });
        }
        else {
            this.institutionForm.patchValue({
                mobile: '',
                email: ''
            });
        }
    };
    InstitutionFormComponent.prototype.createInstitution = function () {
        var _this = this;
        var name = this.institutionForm.get('name').value;
        var motto = this.institutionForm.get('motto').value;
        ;
        var mobile = this.institutionForm.get('mobile').value;
        var email = this.institutionForm.get('email').value;
        var website = this.institutionForm.get('website').value;
        var postal_address = this.institutionForm.get('address.postalAddress').value + ' ' +
            this.institutionForm.get('address.town').value + ' ' +
            this.institutionForm.get('address.postalCode');
        var type = this.institutionForm.get('type').value;
        var domain = this.institutionForm.get('domain').value;
        var logo = null;
        var fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            logo = fi.files[0];
        }
        this.institutionService.createInstitution(name, motto, mobile, email, website, postal_address, type, domain, logo)
            .subscribe(function (data) {
            _this.router.navigate(['dashboard']);
        }, function (error) { return console.log(error); });
    };
    InstitutionFormComponent.prototype.ngAfterViewInit = function () {
        this.contentReady = true;
    };
    InstitutionFormComponent.prototype.getUser = function () {
        var _this = this;
        var jwtHelper = new common_service_1.JwtHelper();
        var errorMessage;
        var token = this.commonService.getJwtToken();
        var user = jwtHelper.decodeToken(token);
        this.userService.getUser(user.user_id)
            .subscribe(function (user) { return _this.user = user; }, function (error) { return errorMessage = error; });
    };
    InstitutionFormComponent.prototype.getInstitutionTypes = function () {
        var _this = this;
        this.institutionService.getInstitutionTypes()
            .subscribe(function (types) { return _this.institutionTypes = types; }, function (error) { return console.log(error); });
    };
    InstitutionFormComponent.prototype.getInstitutions = function () {
        var _this = this;
        this.institutionService.getInstitutions()
            .subscribe(function (institutions) { return _this.institutions = institutions; }, function (error) { return console.log(error); });
    };
    return InstitutionFormComponent;
}());
__decorate([
    core_1.ViewChild('fileInput'),
    __metadata("design:type", Object)
], InstitutionFormComponent.prototype, "fileInput", void 0);
InstitutionFormComponent = __decorate([
    core_1.Component({
        selector: 'institution-form',
        templateUrl: './institution-form.component.html',
        styleUrls: ['./institution-form.component.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        institutions_service_1.InstitutionService,
        user_service_1.UserService,
        common_service_1.CommonService,
        router_1.Router])
], InstitutionFormComponent);
exports.InstitutionFormComponent = InstitutionFormComponent;
//# sourceMappingURL=institution-form.component.js.map