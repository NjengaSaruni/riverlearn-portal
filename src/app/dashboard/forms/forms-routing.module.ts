/**
 * Created by saruni on 8/18/17.
 */


import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsComponent} from './forms.component';
import {StudentFormComponent} from '../student-form.component';
import {SetupComponent} from './setup.component';
import {InstitutionFormComponent} from './institution-form.component';
import {SubjectFormComponent} from './subject-form.component';
import {ClassFormComponent} from './class-form.component';


const formRoutes: Routes = [
  {
    path: '', component: FormsComponent,
    children: [
      {
        path: '', component: FormsComponent,
        children: [
          {
            path: 'classes', component: ClassFormComponent
          },
          {
            path: 'add-institution', component: InstitutionFormComponent
          },
          {
            path: 'add-subject', component: SubjectFormComponent
          },
          { path: 'setup', component: SetupComponent },
          // FIXME: Activate route only if have no institution, add guard.
        ]
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(formRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FormRoutingModule { }
export const formsComponents = [
  ClassFormComponent,
  InstitutionFormComponent,
  FormsComponent,
  SubjectFormComponent,
  SetupComponent
]
