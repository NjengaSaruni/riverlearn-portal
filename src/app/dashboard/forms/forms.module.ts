/**
 * Created by saruni on 8/18/17.
 */

import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormRoutingModule, formsComponents} from './forms-routing.module';
import {UploadService} from '../../common/services/uploads.service';
import {MatProgressBarModule} from "@angular/material";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FormRoutingModule,
    MatProgressBarModule
  ],
  providers: [
    UploadService
  ],
  declarations: [
    formsComponents
  ],

})
export class FormModule {}
