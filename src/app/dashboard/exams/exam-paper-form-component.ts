/**
 * Created by saruni on 10/20/17.
 */

import {Component, OnInit, ViewChild, EventEmitter} from '@angular/core';
import {ExamService} from "../../common/services/exams.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Exam} from "../../common/models/exams.models";
import {DivisionService} from "../../common/services/divisions.service";
import {Class, ClassRoom, InstitutionSubject} from "../../common/models/divisions.models";
import {MatSnackBar} from "@angular/material";
import {UserError} from "../../common/models/common.models";

declare var $: any;

@Component({
  selector: 'exam-paper-form',
  templateUrl: './exam-paper-form-component.html',
  styleUrls: ['./exam-paper-form-component.css'],
  outputs: ['onSavePaper']
})
export class ExamPaperFormComponent implements OnInit {
  errors: UserError[] = [];
  classRooms: ClassRoom[];
  allClasses: Class[];
  classes: Class[];
  subjects: InstitutionSubject[];
  exams: Exam[];

  protected paperForm: FormGroup;
  @ViewChild('fileInput') fileInput : any;
  private selectedExam: Exam;

  onSavePaper = new EventEmitter<any>();

  constructor(
    private examService: ExamService,
    private divisionService: DivisionService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    $(document).ready(function () {
      $('.ui.dropdown').dropdown();

      $('.ui.calendar').calendar();
    });

    this.getExams();
    this.getSubjects();
    this.getClasses();
    this.getClassRooms();

    this.paperForm = this.formBuilder.group({
      exam: [[], Validators.required],
      classes: [[], Validators.required],
      subject: ['', Validators.required],
      start: ['', Validators.required],
      time_hour: [''],
      time_minute: [''],
      time_period: [''],
      duration_hours: [],
      duration_minutes: [],
      total_mark: [100],
      url: [''],
      location: [''],
    });
  }

  getExams(): void {
    this.examService.getExams()
      .subscribe(
        exams => {
          this.exams = exams;
        },
        error => this.openSnackBar(error)
      )
  }

  getSubjects(): void {
    this.divisionService.getSubjects()
      .subscribe(
        subjects => this.subjects = subjects,
        error => this.openSnackBar(error)
      )
  }

  getClasses(): void {
    this.divisionService.getClasses()
      .subscribe(
        classes => {
          this.classes = classes;
          this.allClasses = classes;
        },
        error => this.openSnackBar(error)
      )
  }

  getClassRooms(): void {
      this.divisionService.getClassRooms()
        .subscribe(
          classRooms => {
            this.classRooms = classRooms;
          },
          error => this.openSnackBar("Error fetching class rooms")
        )
  }

  onExamChange(event: any){
    this.paperForm.patchValue({classes: []});

    $('#classes').dropdown('clear');

    this.classes = this.allClasses;
    this.selectedExam = this.exams.find(exam => exam.id == this.paperForm.get('exam').value);
    this.classes = this.classes.filter(cls => {
      for(let level of this.selectedExam.class_levels){
        return cls.level.id == level.id;
      }
    });
  }


  setMinutes(event: any) {
    event.target.value = event.target.value % 60;
  }

  savePaper(event: any): void {
    let exam = this.paperForm.get('exam').value;
    let classes = this.paperForm.get('classes').value;
    let subject = this.paperForm.get('subject').value;
    let start: Date = this.paperForm.get('start').value;

    let time_hour = +this.paperForm.get('time_hour').value;
    let time_minute = +this.paperForm.get('time_minute').value;
    let time_period = +this.paperForm.get('time_period').value;

    if(time_period == 2) {
      time_hour+=12;
    }

    start.setHours(time_hour, time_minute);

    let duration = this.paperForm.get('duration_hours').value + ':' + this.paperForm.get('duration_minutes').value + ':00';
    let total_mark = this.paperForm.get('total_mark').value;
    let location = this.paperForm.get('location').value;
    let url: any;

    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      url = fi.files[0];
    }


    // TODO Ensure paper in proper time frame
    this.examService.createExamPaper(
      exam,
      subject,
      start.toISOString(),
      duration,
      total_mark,
      url,
      location).subscribe(
      paper => {
        this.openSnackBar("Paper saved successfully!!");
        this.onSavePaper.emit(event);
        this.examService.patchExamPaper(paper.id, classes)
          .subscribe()
      },
        error => this.openSnackBar(error, 10000)
    )

    // TODO: ensure time for exam paper in exam period
  }

  openSnackBar(message? : string, duration: number = 3000) {
    let snackBarRef = this.snackBar.open(message, 'Dismiss' ,{
      duration: duration
    });
  }

  checkTime(): void {
      if(this.paperForm.get('time_hour').value > 12) {
        this.paperForm.patchValue({time_hour: "1"});
      }
      else if(this.paperForm.get('time_hour').value > 59) {
        this.paperForm.patchValue({time_minute: "1"});
      }
  }
}
