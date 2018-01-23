/**
 * Created by saruni on 4/9/17.
 */

import {Component, OnChanges, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UserService} from "../common/services/user.service";
import {JoinRequest, User} from "../common/models/users.models";
import {Class, Parent, Student, Teacher} from "../common/models/divisions.models";
import {ClassExamResult, Exam, ExamPaper} from "../common/models/exams.models";
import {DivisionService} from "../common/services/divisions.service";
import {ExamService} from "../common/services/exams.service";
import {Title} from "@angular/platform-browser";

declare var $: any;

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
  private user: User;
  private classes: Class[];
  private students: Student[];
  private parents: Parent[];
  private teachers: Teacher[];
  private exams: Exam[];
  private examPapers: ExamPaper[];
  private examResults: ClassExamResult[];

  private request: JoinRequest;
  private requests: JoinRequest[];
  private institutionRequests: JoinRequest[];
  private requestSubmitted: boolean = false;

  protected color = 'primary';
  protected mode = 'indeterminate';
  protected value = 50;
  protected bufferValue = 75;

  private errorMessage: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private divisionService: DivisionService,
    private examService: ExamService,
    private titleService: Title
  ) {}


  private content = [
    { title: 'Kenya' ,  description: 'Kenyans are tired of the same old story'},
    { title: 'United Arab Emirates' },
    { title: 'Afghanistan' },
  ];

  private reInitializeData() {
    this.getUser();
    this.getClasses();
    this.getStudents();
    this.getParents();
    this.getTeachers();
    this.getExams();
    this.getExamPapers();
    this.getExamResults();
    this.getJoinRequests();
    this.getInstitutionJoinRequests();
  }

  public ngOnInit(){
    this.titleService.setTitle("Dashboard");
    this.reInitializeData();

    // FIXME: DROPDOWN DOESNT WORK SOMETIMES
    $(document).ready(function() {
      $('.ui.dropdown').dropdown();
    });

    $('#studentsSelector').transition({
      animation: 'jiggle',
      duration: 3000
    });

    if ($('#loginModal').is(':visible')) {
      $('#loginModal').modal('hide');
    }
    if ($('#registerModal').is(':visible')) {
      $('#registerModal').modal('hide');
    }

    $('#search-box')
      .search({
        source: this.content
      })
    ;

    $('#following_menu').transition('slide out');
    $('#main_menu').transition('slide out');

    $(document).click((event: any) => {
      if ($(event.target).is('#dashboard-sidebar, #sidebarIcon,#dashboard-sidebar *')) {
        return;
      }
      else if ($( '#dashboard-sidebar' ).hasClass( 'visible' )){
        $('#dashboard-sidebar').transition('fade')
      }
    });
  }

  ngOnChanges() {
    this.reInitializeData()
  }

  getUser(): void {
    this.userService.getLoggedInUser()
      .subscribe(
        user => this.user = user,
        error => this.errorMessage = <any>error);
  }

  getJoinRequests(): void {
    this.userService.getJoinRequests()
      .subscribe(
        requests => this.requests = requests,
        error => this.errorMessage = error.message);
  }

  getInstitutionJoinRequests(): void {
    this.userService.getInstitutionRequests()
      .subscribe(
        requests => this.institutionRequests = requests,
        error => this.errorMessage = error.message);
  }


  requestHandler() {
    for(let req of this.requests){
      if(req.created_by.id === this.user.id){
        // TODO : Enable users to create remake other requests
        $('.ui.basic.modal').modal('show');
        this.requestSubmitted = true;
        this.request = req;
        break;
      }
    }
    if(!this.requestSubmitted){
      this.router.navigate(['dashboard', 'forms', 'setup']);
    }
  }

  getClasses(): void {
    this.divisionService.getClasses()
      .subscribe(
        classes => this.classes = classes,
        error => this.handleLoginError(error),
      );
  }

  getStudents(): void {
    this.divisionService.getStudents()
      .subscribe(
        students => this.students = students,
        error => this.handleLoginError(error),
      );
  }

  getParents(): void {
    this.divisionService.getParents()
      .subscribe(
        parents => this.parents = parents,
        error => this.handleLoginError(error),
      );
  }

  getTeachers(): void {
    this.divisionService.getTeachers()
      .subscribe(
        teachers => this.teachers = teachers,
        error => this.handleLoginError(error),
      );
  }

  getExams(): void {
    this.examService.getExams()
      .subscribe(
        exams => this.exams = exams,
        error => this.handleLoginError(error),
      );
  }

  getExamPapers(): void {
    this.examService.getExamPapers()
      .subscribe(
        examPapers => this.examPapers = examPapers,
        error => this.handleLoginError(error),
      );
  }

  getExamResults(): void {
    this.examService.getExamResults()
      .subscribe(
        examResults => this.examResults = examResults,
        error => this.handleLoginError(error),
      );
  }

  getRequests(): void {
    this.examService.getExamResults()
      .subscribe(
        examResults => this.examResults = examResults,
        error => this.handleLoginError(error),
      );
  }

  handleLoginError(error: any){
    if(error.status >= 500){
      this.errorMessage = 'RiverLearn server is experiencing some problems. Please try again later.';
    }
    // this.errorMessage = error.status
  }

  showStudents(){
    this.getStudents();
    if ($('#studentCards').is(':visible')) {
      $('#studentCards .card').transition({
        animation: 'jiggle',
        duration: 300,
        interval: 50
      });
    }
  }

  showParents(){
    this.getParents();
    if ($('#parentsCards').is(':visible')) {
      $('#parentsCards .card').transition({
        animation: 'jiggle',
        duration: 300,
        interval: 50
      });
    }
  }

  showTeachers(){
    this.getTeachers();
    if ($('#teachersCards').is(':visible')) {
      $('#teacherssCards .card').transition({
        animation: 'jiggle',
        duration: 300,
        interval: 50
      });
    }
  }

  showClasses(event: any){
    this.getClasses();

    this.router.navigate(['dashboard', 'forms', 'classes'])

  }

  public showSideBar(): void {
    if ($('#dashboard-sidebar' ).hasClass( 'visible' )){
      return;
    }
    $('#dashboard-sidebar').transition('fade');

  }

  signOut(){
    this.userService.logout();
  }
}
