/**
 * Created by saruni on 10/3/17.
 */

import {Component, OnInit} from '@angular/core';
import {ExamService} from '../../common/services/exams.service';
import {Exam} from '../../common/models/exams.models';
// import { jqxBarGaugeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxbargauge';


declare var $: any;

@Component({
  selector: 'exam-schedules',
  templateUrl: './exam-schedules.component.html',
  styleUrls: ['./exam-schedules.component.css' ]
})

export class ExamSchedulesComponent implements OnInit {
  private contentReady: boolean = false;
  private exams: Exam[];
  values: number[] = [102, 115, 130, 137, 111, 0, 90];

  constructor(
    private examService: ExamService
  ) {}


  ngOnInit() {
    this.getExams();

  }

  getExams(): void {
    this.examService.getExams()
      .subscribe(
        exams => {
          this.contentReady = true;
          this.exams = exams;
        },
        error => alert(error)
      )
  }
}

