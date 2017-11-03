/**
 * Created by saruni on 10/31/17.
 */

import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {User} from '../../common/models/users.models';
import {UserService} from '../../common/services/user.service';
import {MatSnackBar} from "@angular/material";
import {ExamService} from "../../common/services/exams.service";
import {Exam, ExamPaper} from "../../common/models/exams.models";
import {DivisionService} from "../../common/services/divisions.service";
import {Class, Student} from "../../common/models/divisions.models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

declare var $: any;

@Component({
  templateUrl: './exam-results-form.component.html',
  styleUrls: ['./exam-results-form.component.css']
})
export class ExamResultsFormComponent implements OnInit {
  contentReady: boolean;
  filteredExams: Exam[];
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

  constructor(
    private userService: UserService,
    private examService: ExamService,
    private divisionService: DivisionService,
    private titleService: Title,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar
  ) {}

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


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

    this.firstFormGroup = this.formBuilder.group({
      exam: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    $(document).ready(function () {
      $('.ui.search')
        .search({
          apiSettings: {
            url: '//api.github.com/search/repositories?q={query}'
          },
          fields: {
            results : 'items',
            title   : 'name',
            url     : 'html_url'
          },
          minCharacters : 3
        })
      ;

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

  selectPaper(paper: ExamPaper, _class: Class): void {
    this.selectedPaper = paper;
    this.selectedClass = _class;

    this.divisionService.getClass(this.selectedClass.id)
      .subscribe(
        cls => this.selectedClass = cls,
        error => this.openSnackBar(error)
      );
    $('#results-modal').modal('show')
  }

  filterExams(event: any): void {
    let q = this.resultForm.get('exam').value;
    console.log(q);
    this.examService.getExams(q)
      .subscribe(
        exams => this.filteredExams = exams,
        error => this.openSnackBar(error)
      )
  }
}


