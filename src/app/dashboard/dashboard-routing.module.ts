/**
 * Created by saruni on 7/28/17.
 */

import {ModuleWithProviders}             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent} from './dashboard.component';
import { SampleGraphsComponent } from './sample-graphs.component';
import {UserDetailComponent} from './user-detail.component';
import {StudentsComponent} from './students.component';
import {TeachersComponent} from './teachers.component';
import {ManagementComponent} from './management.component';
import {FeedComponent} from './feed.component';
import {DashboardMainComponent} from './dashboard-main.component';
import {AdminGuard, AuthGuard} from '../common/services/auth-guard.service';
import {RequestsComponent} from './requests.component';
import {InstitutionComponent} from './institution.component';
import {StudentFormComponent} from './student-form.component';
import {ParentsComponent} from './parents.component';
import {ParentFormComponent} from './parent-form.component';
import {TeacherFormComponent} from './teacher-form.component';
import {StudentDetailComponent} from "./student-detail.component";


const dashboardRoutes: Routes = [
  // FIXME: Forms are added on top of current route
  {
    path: '', component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'profile', component: UserDetailComponent },
          { path: 'graphs', component: SampleGraphsComponent },
          { path: 'students', component: StudentsComponent},
          { path: 'students/:id', component: StudentDetailComponent },
          { path: 'teachers', component: TeachersComponent },
          { path: 'parents', component: ParentsComponent },
          {
            path: 'management',
            component: ManagementComponent,
            canActivate: [AdminGuard]
          },
          {
            path: 'institution',
            component: InstitutionComponent
          },
          {
            path: 'requests',
            component: RequestsComponent ,
            // canActivate: [AdminGuard]
            // FIXME: Bug cause user instance not initiated on first load.
          },
          {
            path: 'forms',
            loadChildren: 'app/dashboard/forms/forms.module#FormModule',
          },
          {
            path: 'exams',
            loadChildren: 'app/dashboard/exams/exams.module#ExamsModule',
          },
          { path: '', redirectTo: '/dashboard/graphs', pathMatch: 'full' },
        ]
      }
    ]
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(dashboardRoutes);
export const dashboardComponents = [
  DashboardComponent,
  DashboardMainComponent,
  InstitutionComponent,
  FeedComponent,
  ManagementComponent,
  ParentsComponent,
  ParentFormComponent,
  RequestsComponent,
  SampleGraphsComponent,
  StudentDetailComponent,
  StudentFormComponent,
  StudentsComponent,
  TeachersComponent,
  TeacherFormComponent,
  UserDetailComponent,

];
