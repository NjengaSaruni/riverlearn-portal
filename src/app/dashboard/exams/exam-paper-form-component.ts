/**
 * Created by saruni on 10/20/17.
 */

import {Component, OnInit, ViewChild} from '@angular/core';
import {ExamService} from "../../common/services/exams.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Exam} from "../../common/models/exams.models";
import {DivisionService} from "../../common/services/divisions.service";
import {Class, ClassRoom, InstitutionSubject} from "../../common/models/divisions.models";
import {MatSnackBar} from "@angular/material";
import {File} from "../../common/models/uploads.models";
import {CommonService} from "../../common/services/common.service";

declare var $: any;

@Component({
  selector: 'exam-paper-form',
  templateUrl: './exam-paper-form-component.html',
  styleUrls: ['./exam-paper-form-component.css']
})
export class ExamPaperFormComponent implements OnInit {
  classRooms: ClassRoom[];
  allClasses: Class[];
  classes: Class[];
  subjects: InstitutionSubject[];
  exams: Exam[];

  protected paperForm: FormGroup;
  @ViewChild('fileInput') fileInput : any;
  private selectedExam: Exam;

  constructor(
    private examService: ExamService,
    private divisionService: DivisionService,
    private commonService: CommonService,
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
      duration_h: [],
      duration_m: [],
      total_mark: [100],
      csv_file: [''],
      location: [''],
    });
  }

  getExams(): void {
    this.examService.getExams()
      .subscribe(
        exams => {
          this.exams = exams;
        },
        error => alert(error)
      )
  }

  getSubjects(): void {
    this.divisionService.getSubjects()
      .subscribe(
        subjects => this.subjects = subjects,
        error => alert(error)
      )
  }

  getClasses(): void {
    this.divisionService.getClasses()
      .subscribe(
        classes => {
          this.classes = classes;
          this.allClasses = classes;
        },
        error => alert(error)
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

  savePaper(): void {
    let exam = this.paperForm.get('exam').value;
    let classes = this.paperForm.get('classes').value;
    let subject = this.paperForm.get('subject').value;
    let start = this.paperForm.get('start').value;
    let duration = this.paperForm.get('duration_h').value + ':' + this.paperForm.get('duration_m').value;
    let total_mark = this.paperForm.get('total_mark').value;
    let location = this.paperForm.get('location').value;

    let csv_file = new File();
    csv_file.title = this.selectedExam.name;

    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      csv_file.url = fi.files[0];
    }

    this.examService.createExamPaper(
      exam,
      subject,
      start,
      duration,
      total_mark,
      classes,
      csv_file).subscribe(
        paper => this.openSnackBar("Paper saved successfully!!"),
        error => this.openSnackBar(error, 10000)
    )
  }

  openSnackBar(message? : string, duration: number = 3000) {
    let snackBarRef = this.snackBar.open(message, 'Dismiss' ,{
      duration: duration
    });
  }

}
