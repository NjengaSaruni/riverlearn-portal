/**
 * Created by saruni on 7/28/17.
 */

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ChartsModule} from "ng2-charts";
import {dashboardComponents, routing} from "./dashboard-routing.module";
import {ExamService} from "../common/services/exams.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminGuard} from "../common/services/auth-guard.service";
import {
  MatFormFieldModule, MatInputModule, MatMenuModule, MatProgressBarModule,
  MatSnackBarModule
} from "@angular/material";
import {UploadService} from "../common/services/uploads.service";
import {MessagingService} from "../common/services/messaging.service";
import {MessageTimePipe} from "../common/utils";

@NgModule({
  imports: [
    ChartsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    MatProgressBarModule,
    MatSnackBarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    ExamService,
    UploadService,
    MessagingService,
    AdminGuard
  ],
  declarations: [
    dashboardComponents,
    MessageTimePipe,
  ],

})
export class DashboardModule {
}
