/**
 * Created by saruni on 9/24/17.
 */

import {ModuleWithProviders}             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExamsComponent} from './exams.component';
import {AuthGuard} from '../../common/services/auth-guard.service';
import {ExamSchedulesComponent} from './exam-schedules.component';
import {ExamScheduleFormComponent} from './exam-schedule-form.component';
import {ExamResultsComponent} from "./exam-results-component";
import {ExamPaperFormComponent} from "./exam-paper-form-component";


const examRoutes: Routes = [
  {
    path: '', component: ExamsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'schedules', component: ExamSchedulesComponent },
          { path: 'add', component: ExamScheduleFormComponent },
          { path: 'results', component: ExamResultsComponent },
          { path: '', redirectTo: '/dashboard/exams/schedules', pathMatch: 'full' },
        ]
      }
    ]
  },
];


export const examRoutingModule: ModuleWithProviders = RouterModule.forChild(examRoutes);
export const examComponents = [
  ExamResultsComponent,
  ExamScheduleFormComponent,
  ExamSchedulesComponent,
  ExamsComponent,
  ExamPaperFormComponent
];
