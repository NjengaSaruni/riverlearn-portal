/**
 * Created by saruni on 9/24/17.
 */

import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminGuard} from '../../common/services/auth-guard.service';
import {ExamService} from '../../common/services/exams.service';
import {examComponents, examRoutingModule} from './exams-routing.module';
import { jqxBarGaugeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxbargauge';
import { jqxSchedulerComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxscheduler';
import { jqxChartComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxchart';
import {
  MatCardModule,
  MatDatepickerModule, MatFormFieldModule, MatIconModule, MatIconRegistry, MatInputModule, MatListModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatSidenavModule, MatSnackBarModule, MatTabsModule
} from "@angular/material";

@NgModule({
  imports: [
    ChartsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    examRoutingModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule,
],
  providers: [
    ExamService,
    AdminGuard,
    MatIconRegistry
  ],
  declarations: [
    examComponents,
    jqxBarGaugeComponent,
    jqxChartComponent,
    jqxSchedulerComponent
],

})
export class ExamsModule {
}
