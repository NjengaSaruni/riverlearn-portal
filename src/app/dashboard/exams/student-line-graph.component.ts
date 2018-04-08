/**
 * Created by saruni on 1/2/18.
 */

import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {DivisionService} from "../../common/services/divisions.service";
import {MatSnackBar} from "@angular/material";
import {Student, StudentComment} from "../../common/models/divisions.models";
import {ExamService} from "../../common/services/exams.service";
import {StudentPaperPerformance} from "../../common/models/exams.models";
import {jqxChartComponent} from "jqwidgets-framework/jqwidgets-ts/angular_jqxchart";
import {AnonymousSubscription} from "rxjs/Subscription";
import {UserService} from "../../common/services/user.service";
import {User} from "../../common/models/users.models";

declare var $: any;

@Component({
  selector: 'student-line-graph',
  templateUrl: './student-line-graph.component.html',
  styleUrls: ['./student-line-graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StudentLineGraphComponent {
  studentComments: StudentComment[];
  comment: any;
  loadingGraph: boolean;

  @ViewChild('studentLineChart') studentLineChart: jqxChartComponent;

  commentTabActive: boolean;
  examPerformances: StudentPaperPerformance[];
  studentPerformances: StudentPaperPerformance[];
 public  timerSubscription: AnonymousSubscription;
  selectedStudent: Student;
  firstLoad: boolean = true;
  students: Student[];
  points: any[] = [];

  resultsData: Array<any> = [];

  xAxis: any = {
    dataField: "Exam",
  };

  valueAxis: any =
    {
      visible: true
    };

  colorScheme: string = "scheme04";

  seriesGroups: any[] = [{
    type: "spline",
    alignEndPointsWithIntervals: true,
    series: [
      { emptyPointsDisplay: 'zero'}
    ],
  }];

  title: string;
  description: string;

  public color = 'primary';
  public mode = 'indeterminate';
  public value = 50;
  public bufferValue = 75;
  user: User;

  constructor(
   public  divisionService: DivisionService,
   public  userService: UserService,
   public  examService: ExamService,
    public snackBar: MatSnackBar
  ){
    this.getUser();
  }

  getStudents(query?:string, user?: string): void {
    this.divisionService.getStudents(query, user)
      .subscribe(
        students => {
          if(!query){
            this.selectedStudent = students[0];
            this.loadingGraph = true;
            this.commentTabActive = false;
            this.getStudentPerformances();
          }
          else {
            this.students = students;
          }
        },
        error => this.openSnackBar(error)
      )
  }

  getUser(): void {
    this.userService.getLoggedInUser()
      .subscribe(
        user => {
          this.user = user;
          if(user.account_type.name == 'Student'){
            this.getStudents(null, user.id);
          }
        },
        error => this.openSnackBar(error)
      );
  }

  getStudentPerformances(exam?: string): void {
      this.examService.getStudentExamPaperPerformances(null, this.selectedStudent.id, exam)
        .subscribe(
          performances => {
            if(!exam){
              this.studentPerformances = performances;
              this.renderGraph(performances);
            }
            else{
              this.examPerformances = performances;
            }
          },
          error => this.openSnackBar(error)
        )
  }

  getStudentComments(): void {
    this.divisionService.getStudentComments(this.selectedStudent.id)
      .subscribe(
        comments => {
          this.studentComments = comments;
          // this.subscribeToComments();
        },
        error => this.openSnackBar(error)
      );
  }

  // subscribeToComments(): void {
  //   this.timerSubscription = Observable.timer(5000).first().subscribe(() => this.getStudentComments());
  // }


  togglePostButton(): void {
      $('#post-button').transition('fade')
  }

  renderGraph(performances: StudentPaperPerformance[]): void {
    let subjects: any[] = [];
    let exams: any[] = [];

    this.examPerformances = [];
    this.seriesGroups[0].series = [];
    this.title = this.selectedStudent.user.first_name + '\'s trend per subject';
    this.description = 'Performance over the past exams';

    // Prepare subjects uniquely
    for(let performance of performances) {
      let subject =  performance.class_performance.paper.subject.name;

      if(! subjects.includes(subject)){
        this.seriesGroups[0].series.push({
          dataField: subject,
          displayText: subject,
          emptyPointsDisplay: 'connect'
        });

        subjects.push(subject)
      }
    }

    this.resultsData = [];

    if(this.points.length > 0) {
      this.points.length = 0;
    }

    // Prepare exams uniquely
    for(let performance of performances){
      let exam_id = performance.class_performance.paper.exam.id;
      let exam_name = performance.class_performance.paper.exam.name;
      let exam_create_time = performance.class_performance.paper.exam.created_at;

      if(! exams.includes(exam_id)){
        let obj = {};
        obj['Exam'] = exam_name;
        obj['Id'] = exam_id;
        obj['Time'] = exam_create_time;
        this.points.push(obj);
        exams.push(exam_id);
      }

      let key = performance.class_performance.paper.subject.name;
      this.points.find(item => item.Exam == exam_name)[key] = performance.mark;

    }

    // Sort exams by time
    this.points.sort((a, b) => {
      if(a.Time < b.Time) {
        return -1;
      }
      return 1;
    });

    // Push to chartData
    for(let point of this.points){
      this.resultsData.push(point);
    }

    this.studentLineChart.update();
    this.loadingGraph = false;
  }


  printChart(): void {
    let content = this.studentLineChart.host[0].outerHTML;
    let newWindow = window.open('', '', 'width=800, height=500'),
      document = newWindow.document.open(),
      pageContent =
        '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '<meta charset="utf-8" />' +
        '<title>jQWidgets Chart</title>' +
        '</head>' +
        '<body>' + content + '</body></html>';
    try {
      document.write(pageContent);
      document.close();
      newWindow.print();
      newWindow.close();
    }
    catch (error) {
    }
  }

  saveAsJPEG() {
    this.studentLineChart.saveAsJPEG(this.selectedStudent.user.full_name + '\'s' + ' performance trend' + '.jpeg', 'https://www.jqwidgets.com/export_server/export.php');
  };
  saveAsPNG() {
    this.studentLineChart.saveAsPNG(this.selectedStudent.user.full_name + '\'s' + ' performance trend' + '.png', 'https://www.jqwidgets.com/export_server/export.php');
  };
  saveAsPDF() {
    this.studentLineChart.saveAsPDF(this.selectedStudent.user.full_name + '\'s' + ' performance trend' + '.pdf', 'https://www.jqwidgets.com/export_server/export.php');
  };

  openDropdown(event: any): void {
    if(this.firstLoad){
      $(event.target).dropdown('toggle');

      $('.ui.button.dropdown')
        .dropdown();

      this.firstLoad = false;
    }
  }

  onSelectStudent(student: Student): void {
    if (student == this.selectedStudent){
      return;
    }
    this.selectedStudent = student;
    this.loadingGraph = true;
    this.commentTabActive = false;

    this.getStudentPerformances();
  }

  toggleComments(): void {
    $('#comments').transition('slide down');
    this.commentTabActive ? this.commentTabActive = false : this.commentTabActive = true;

    if(this.commentTabActive){
      this.getStudentComments();
    }
  }


  saveComment(){
    if(this.comment){
      this.divisionService.createStudentComment(this.selectedStudent.id, this.comment)
        .subscribe(
          comment => {
            this.comment = null;
            this.getStudentComments();
          },
          error => this.openSnackBar(error)
        )
    }
  }

  searchStudents(event: any) {
    let text: string = event.target.value;
    if(text.length >= 1){
      this.getStudents(text)
    }

  }
  openSnackBar(message? : string, duration: number = 3000) {
    this.snackBar.open(message, 'Dismiss' ,{
      duration: duration
    });
  }
}
