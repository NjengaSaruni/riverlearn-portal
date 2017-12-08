/**
 * Created by saruni on 10/31/17.
 */

import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {User} from '../../common/models/users.models';
import {UserService} from '../../common/services/user.service';
import {MatSnackBar} from "@angular/material";
import {ExamService} from "../../common/services/exams.service";
import {ClassExamResult, Exam, ExamPaper} from "../../common/models/exams.models";
import {DivisionService} from "../../common/services/divisions.service";
import {Class, Student} from "../../common/models/divisions.models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HotRegisterer} from "angular-handsontable";
import {genData} from "./data";

declare var $: any;

@Component({
  templateUrl: './exam-results-form.component.html',
  styleUrls: ['./exam-results-form.component.css']
})
export class ExamResultsFormComponent implements OnInit {
  result: ClassExamResult;
  contentReady: boolean;
  studentsReady: boolean;
  students: Student[];
  papers: ExamPaper[];
  exams: Exam[];
  private user: User;
  protected resultForm: FormGroup;
  protected selectedExam: Exam = null;
  protected color = 'primary';
  protected mode = 'indeterminate';
  protected value = 50;
  protected bufferValue = 75;
  protected selectedPaper: ExamPaper;
  protected selectedClass: Class;

  title = "Student's Name";

  instance: string = "hotInstance";
  coordX: string;
  coordY: string;
  newValue: string;

  data: any[] = genData();

  settings: object = {
    afterLoadData: (firstLoad) => {
      if(!firstLoad) {
        this.isLoading = false;
      }
    },
  };

  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private examService: ExamService,
    private divisionService: DivisionService,
    private titleService: Title,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private _hotRegisterer: HotRegisterer
  ) {}

  public ngOnInit(){
    this.titleService.setTitle("Examinations | Results Form");
    this.resultForm = this.formBuilder.group(
      {
        student: ['', Validators.required],
        exam: ['']
      }
    );

    this.getStudents();
    this.getExams();

    $(document).ready(function () {
      $('.ui.dropdown').dropdown();

      $('.ui.accordion').accordion();
    })
  }

  openSnackBar(message? : string, duration: number = 3000) {
    let snackBarRef = this.snackBar.open(message, 'Dismiss' ,{
      duration: duration
    });
  }

  getUser(): void {
    this.userService.getLoggedInUser()
      .subscribe(
        user => this.user = user,
        error => this.openSnackBar(error)
      )
  }

  getExams(event?: any): void {
    this.contentReady = false;
    let value = '';
    if(event != null){
      value = event.target.value;
    }
    this.examService.getExams(value)
      .subscribe(
        exams => {
          this.contentReady = true;
          this.exams = exams;
        },
        error => this.openSnackBar(error)
      )
  }

  getExamPapers(): void {
    this.examService.getExamPapers()
      .subscribe(
        papers => this.papers = papers,
        error => this.openSnackBar(error)
      )
  }

  getStudents(): void {
    this.divisionService.getStudents()
      .subscribe(
        students => this.students = students,
        error => this.openSnackBar(error)
      )
  }

  getExam(): void {
    this.examService.getExam('')
      .subscribe(
        exam => this.selectedExam = exam,
        error => this.openSnackBar(error)
      )
  }

  selectExam(paper: ExamPaper, exam: Exam, _class: Class): void {
    this.data = null;
    this.studentsReady = false;
    this.isLoading = true;
    this.selectedPaper = paper;
    this.selectedExam = exam;

    this.examService.getExamResults(exam.id)
      .subscribe(
        results => {
          this.result = results[0];
          this.studentsReady = true;
        },
        error => this.openSnackBar(error)
      );

    $('#results-modal').modal('show')
  }

  selectCell($event) {
    const x = parseInt(this.coordX, 10);
    const y = parseInt(this.coordY, 10);
    const hot = this._hotRegisterer.getInstance(this.instance);

    if (isNaN(x) || isNaN(y)) {
      hot.deselectCell();
      return false;
    }

    if (hot.selectCell(y, x)) {
      $event.target.focus();

    } else {
      hot.deselectCell();
    }

    hot.unlisten();
  }

  changeValue($event) {
    const x = parseInt(this.coordX, 10);
    const y = parseInt(this.coordY, 10);

    if (isNaN(x) || isNaN(y)) {
      return false;
    }

    const hot = this._hotRegisterer.getInstance(this.instance);

    hot.setDataAtCell(y, x, $event.target.value);
  }

  syncSelection() {
    const hot = this._hotRegisterer.getInstance(this.instance);
    [this.coordY, this.coordX] = hot.getSelected();
    const x = parseInt(this.coordX, 10);
    const y = parseInt(this.coordY, 10);

    this.newValue = hot.getDataAtCell(y, x);
  }

  addNewColumn($event) {
    const hot = this._hotRegisterer.getInstance(this.instance);
    hot.alter('insert_col', 10);
  }
}

