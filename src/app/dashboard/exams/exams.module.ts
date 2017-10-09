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


@NgModule({
  imports: [
    ChartsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    examRoutingModule,
  ],
  providers: [
    ExamService,
    AdminGuard
  ],
  declarations: [
    examComponents
  ],

})
export class ExamsModule {
}
