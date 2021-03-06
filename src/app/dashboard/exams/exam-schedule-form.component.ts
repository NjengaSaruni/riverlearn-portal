/**
 * Created by saruni on 10/5/17.
 */

import {Component, EventEmitter, OnInit} from '@angular/core';
import {Exam} from '../../common/models/exams.models';
import {ExamService} from '../../common/services/exams.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Level} from "../../common/models/divisions.models";
import {DivisionService} from "../../common/services/divisions.service";
import {MatSnackBar} from "@angular/material";

declare var $: any;

@Component({
  selector: 'exam-schedule-form',
  templateUrl: './exam-schedule-form.component.html',
  styleUrls: ['./exam-schedule-form.component.css' ],
  outputs: ['onSaveSchedule']
})

export class ExamScheduleFormComponent implements OnInit {
  public contentReady: boolean = false;
  public savingExamCycle: boolean = false;
  public exams: Exam[];
  public levels: Level[];
  public examForm: FormGroup;

  public color = 'primary';
  public mode = 'indeterminate';
  public value = 50;
  public bufferValue = 75;

  public errors: string[];

  onSaveSchedule = new EventEmitter<boolean>();

  constructor(
   public  divisionService: DivisionService,
   public  examService: ExamService,
   public  formBuilder: FormBuilder,
    public snackBar: MatSnackBar
  ) {}

  openSnackBar(message? : string, duration: number = 3000) {
    let snackBarRef = this.snackBar.open(message,'Dismiss' ,{
      duration: duration
    });
  }

  ngOnInit() {
    this.getExams();
    this.getLevels();
    this.examForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        class_levels: ['', Validators.required],
        notes: [''],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required]
      }
    );

    $(document).ready(function () {
      $('.ui.dropdown').dropdown();
    })
  }

  getExams(): void {
    this.examService.getExams()
      .subscribe(
        exams => {
          this.contentReady = true;
          this.exams = exams;
        },
        error => this.openSnackBar(error)
      )
  }

  getLevels(): void {
    this.divisionService.getLevels()
      .subscribe(
        levels => this.levels = levels,
        error => this.openSnackBar(error)
      )
  }

  saveExamCycle(event: any) {
    this.savingExamCycle = true;

    if(this.examForm.status == "INVALID"){
      this.openSnackBar("Please fill in all required fields and/or correct errors", 3000);
      this.savingExamCycle = false;
      return;
    }
    if(this.examForm.get('end_date').value < this.examForm.get('start_date').value &&
      this.examForm.get('end_date').status == 'VALID'){
      this.openSnackBar("Error: Start date cannot be later than end date", 3000);
      this.savingExamCycle = false;
      return;
    }
    let name = this.examForm.get('name').value;
    let class_levels = this.examForm.get('class_levels').value;
    let notes = this.examForm.get('notes').value;
    let start_date = this.examForm.get('start_date').value;
    let end_date = this.examForm.get('end_date').value;

    this.examService.createExam(name, class_levels, notes, start_date, end_date)
      .subscribe(
        exam => {
          this.openSnackBar("Exam cycle saved", 2000);
          this.onSaveSchedule.emit(event);
          this.savingExamCycle = false;
        },
        error => alert(error)
      )

  }
}
