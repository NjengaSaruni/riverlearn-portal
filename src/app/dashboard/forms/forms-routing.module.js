/**
 * Created by saruni on 8/18/17.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_component_1 = require("./forms.component");
var setup_component_1 = require("./setup.component");
var institution_form_component_1 = require("./institution-form.component");
var subject_form_component_1 = require("./subject-form.component");
var class_form_component_1 = require("./class-form.component");
var formRoutes = [
    {
        path: '', component: forms_component_1.FormsComponent,
        children: [
            {
                path: '', component: forms_component_1.FormsComponent,
                children: [
                    {
                        path: 'classes', component: class_form_component_1.ClassFormComponent
                    },
                    {
                        path: 'add-institution', component: institution_form_component_1.InstitutionFormComponent
                    },
                    {
                        path: 'add-subject', component: subject_form_component_1.SubjectFormComponent
                    },
                    { path: 'setup', component: setup_component_1.SetupComponent },
                ]
            }
        ]
    },
];
var FormRoutingModule = (function () {
    function FormRoutingModule() {
    }
    return FormRoutingModule;
}());
FormRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(formRoutes)
        ],
        exports: [
            router_1.RouterModule
        ]
    })
], FormRoutingModule);
exports.FormRoutingModule = FormRoutingModule;
exports.formsComponents = [
    class_form_component_1.ClassFormComponent,
    institution_form_component_1.InstitutionFormComponent,
    forms_component_1.FormsComponent,
    subject_form_component_1.SubjectFormComponent,
    setup_component_1.SetupComponent
];
//# sourceMappingURL=forms-routing.module.js.map