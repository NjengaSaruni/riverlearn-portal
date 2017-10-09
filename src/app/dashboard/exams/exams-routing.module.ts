/**
 * Created by saruni on 9/24/17.
 */

import {ModuleWithProviders}             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExamsComponent} from './exams.component';
import {AuthGuard} from '../../common/services/auth-guard.service';
import {ExamSchedulesComponent} from './exam-schedules.component';
import {ExamScheduleFormComponent} from './exam-schedule-form.component';


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
          { path: '', redirectTo: '/dashboard/exams/schedules', pathMatch: 'full' },
        ]
      }
    ]
  },
];



export const examRoutingModule: ModuleWithProviders = RouterModule.forChild(examRoutes);
export const examComponents = [
  ExamsComponent,
  ExamScheduleFormComponent,
  ExamSchedulesComponent,
];
