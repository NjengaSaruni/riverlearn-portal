/**
 * Created by saruni on 10/5/17.
 */

import {Component, OnInit} from '@angular/core';
import {Exam} from '../../common/models/exams.models';
import {ExamService} from '../../common/services/exams.service';

declare var $: any;

@Component({
  selector: 'exam-schedule-form',
  templateUrl: './exam-schedule-form.component.html',
  styleUrls: ['./exam-schedule-form.component.css' ]
})

export class ExamScheduleFormComponent implements OnInit {
  private contentReady: boolean = false;
  private exams: Exam[];

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

