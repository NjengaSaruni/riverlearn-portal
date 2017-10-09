/**
 * Created by saruni on 7/28/17.
 */

import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { dashboardComponents, routing } from './dashboard-routing.module';
import {ExamService} from '../common/services/exams.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminGuard} from '../common/services/auth-guard.service';

@NgModule({
  imports: [
    ChartsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
  ],
  providers: [
    ExamService,
    AdminGuard
  ],
  declarations: [
    dashboardComponents
  ],

})
export class DashboardModule {
}
