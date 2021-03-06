/**
 * Created by saruni on 9/24/17.
 */

import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminGuard} from '../../common/services/auth-guard.service';
import {ExamService} from '../../common/services/exams.service';
import {examComponents, examRoutingModule} from './exams-routing.module';
import { jqxBarGaugeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxbargauge';
import { jqxSchedulerComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxscheduler';
import { jqxChartComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxchart';
import { jqxDateTimeInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdatetimeinput';
import {
  MatDatepickerModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatSnackBarModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule,
} from "@angular/material";
import jqxDateTimeInput = jqwidgets.jqxDateTimeInput;
import {AngularEchartsModule} from "ngx-echarts";
import {ChartsModule} from "ng2-charts";
import {PredictionService} from "../../common/services/intelligence.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    examRoutingModule,
    AngularEchartsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTabsModule,
    MatStepperModule,
    MatToolbarModule,
    MatTableModule
],
  providers: [
    ExamService,
    PredictionService,
    AdminGuard
  ],
  declarations: [
    examComponents,
    jqxBarGaugeComponent,
    jqxChartComponent,
    jqxSchedulerComponent,
    jqxDateTimeInputComponent
],

})
export class ExamsModule {
}
