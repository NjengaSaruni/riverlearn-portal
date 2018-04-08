/**
 * Created by saruni on 10/31/17.
 */

import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {User} from '../../common/models/users.models';
import {UserService} from '../../common/services/user.service';
import {MatSnackBar} from "@angular/material";
import {ExamService} from "../../common/services/exams.service";
import {
  ClassExamPaperPerformance, ClassExamResult, Exam, ExamPaper,
  StudentPaperPerformance
} from "../../common/models/exams.models";
import {DivisionService} from "../../common/services/divisions.service";
import {Class, Student} from "../../common/models/divisions.models";

declare var $: any;

@Component({
  templateUrl: './exam-results-form.component.html',
  styleUrls: ['./exam-results-form.component.css']
})
export class ExamResultsFormComponent implements OnInit {
  classPaperPerformance: ClassExamPaperPerformance;
  allStudentPerformances: StudentPaperPerformance[];
  result: ClassExamResult;
  contentReady: boolean;
  studentsReady: boolean;
  students: Student[];
  papers: ExamPaper[];
  exams: Exam[];
 public  user: User;
  public selectedExam: Exam = null;
  public color = 'primary';
  public mode = 'indeterminate';
  public value = 50;
  public bufferValue = 75;
  public selectedPaper: ExamPaper;
  public selectedClass: Class;
  public results = [];

  public workingTotal: number = 0;
  public workingMean: number = 0;

  isLoading: boolean = false;
  selectedStudent: Student;

  constructor(
   public  userService: UserService,
   public  examService: ExamService,
   public  divisionService: DivisionService,
   public  titleService: Title,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit(){
    this.titleService.setTitle("Examinations | Results Form");

    this.getStudents();
    this.getExams();

    $(document).ready(function () {
      $('.ui.dropdown').dropdown();

      $('.ui.accordion').accordion();
    })
  }

  openSnackBar(message? : string, duration: number = 3000) {
    this.snackBar.open(message, 'Dismiss' ,{
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

  selectExam(paper: ExamPaper, exam: Exam, _class: Class): void {
    this.titleService.setTitle('Examinations | Results ' + exam.name + ' ' + _class.name);
    this.selectedStudent = null;
    this.studentsReady = false;
    this.isLoading = true;
    this.divisionService.getClass(_class.id)
      .subscribe(
        exam => this.selectedClass = exam,
        error => this.openSnackBar(error),
      );
    this.examService.getExam(exam.id)
      .subscribe(
        exam => this.selectedExam = exam,
        error => this.openSnackBar(error)
      );
    this.examService.getExamPaper(paper.id)
      .subscribe(
        paper => this.selectedPaper = paper,
        error => this.openSnackBar(error)
      );

    this.examService.getExamResults(exam.id)
      .subscribe(
        results => {
          this.result = results[0];
          this.studentsReady = true;
        },
        error => this.openSnackBar(error)
      );

    this.getClassExamPaperPerformances(paper.id);

    this.calculateMean();

    $('#results-modal').modal('show');

  }

  getClassExamPaperPerformances(paperId: string) {
    this.examService.getClassExamPaperPerformances(paperId)
      .subscribe(
        performances => {
          this.classPaperPerformance = performances[0];
          this.classPaperPerformance.student_performances = this.classPaperPerformance.student_performances.filter(
            perf => perf.student.current_class.id == this.selectedClass.id
          );
          this.allStudentPerformances = this.classPaperPerformance.student_performances;
        },
        error => this.openSnackBar(error)
      );
  }

  onEnterInput(performance: StudentPaperPerformance): void {
    this.selectedStudent = performance.student;

    this.calculateMean();
  }

  calculateMean(): void {

    if (this.classPaperPerformance == null) {
      return;
    }
    let count = 0;
    this.workingTotal = 0;
    for(let _performance of this.classPaperPerformance.student_performances) {
      this.workingTotal += parseInt(_performance.mark.toString());
      count += 1;
    }

    this.workingMean = this.workingTotal / count;
  }

  onEditPerformance(i: number, event: any, performance: StudentPaperPerformance): void {
    this.selectedStudent = performance.student;
    this.classPaperPerformance.student_performances[i].mark = event.target.value;

    this.calculateMean();
  }

  onSaveResults(event: any, performance: StudentPaperPerformance){
    this.studentsReady = false;
    this.examService.patchStudentPaperPerformance(performance.id, event.target.value)
      .subscribe(
        perf => {
          this.openSnackBar("Saved");
          this.getClassExamPaperPerformances(this.selectedPaper.id);
        },
        error => this.openSnackBar(error)
      );

    this.studentsReady = true;
  }

  onSearchStudent(event: any) {
    // Searches through the students in current paper
    for(let value of event.target.value.split(" ")){
      let re = new RegExp(value, "i");

      this.classPaperPerformance.student_performances = this.allStudentPerformances.filter(
        perf => perf.student.user.full_name.search(re) > -1
      );
    }

  }
}


