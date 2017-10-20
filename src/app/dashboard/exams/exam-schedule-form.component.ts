/**
 * Created by saruni on 10/5/17.
 */

import {Component, OnInit} from '@angular/core';
import {Exam} from '../../common/models/exams.models';
import {ExamService} from '../../common/services/exams.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

declare var $: any;

@Component({
  selector: 'exam-schedule-form',
  templateUrl: './exam-schedule-form.component.html',
  styleUrls: ['./exam-schedule-form.component.css' ]
})

export class ExamScheduleFormComponent implements OnInit {
  private contentReady: boolean = false;
  private exams: Exam[];
  private examForm: FormGroup;

  constructor(
    private examService: ExamService,
    private formBuilder: FormBuilder
  ) {}


  ngOnInit() {
    this.getExams();
    this.examForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        class_levels: ['', Validators.required],
        note: [''],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required]
      }
    )
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

