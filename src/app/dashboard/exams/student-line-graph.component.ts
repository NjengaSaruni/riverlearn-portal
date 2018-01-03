/**
 * Created by saruni on 1/2/18.
 */

import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {DivisionService} from "../../common/services/divisions.service";
import {MatSnackBar} from "@angular/material";
import {Student} from "../../common/models/divisions.models";
import {ExamService} from "../../common/services/exams.service";
import {StudentPaperPerformance} from "../../common/models/exams.models";
import {jqxChartComponent} from "jqwidgets-framework/jqwidgets-ts/angular_jqxchart";

declare var $: any;

@Component({
  selector: 'student-line-graph',
  templateUrl: './student-line-graph.component.html',
  styleUrls: ['./student-line-graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StudentLineGraphComponent implements OnInit {
  @ViewChild('studentLineChart') studentLineChart: jqxChartComponent;

  studentPerformances: StudentPaperPerformance[];
  selectedStudent: Student;
  firstLoad: boolean = true;
  students: Student[];

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
      { emptyPointsDisplay: 'skip', displayText: 'Value', lineWidth: 2, symbolSize: 8, symbolType: 'circle' }
    ],
  }];

  title: string;
  description: string;

  constructor(
    private divisionService: DivisionService,
    private examService: ExamService,
    public snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getStudents();

  }

  getStudents(): void {
    this.divisionService.getStudents()
      .subscribe(
        students => this.students = students,
        error => this.openSnackBar(error)
      )
  }

  getStudentPerformances(): void {
      this.examService.getStudentExamPaperPerformances(null, this.selectedStudent.id)
        .subscribe(
          performances => {
            this.studentPerformances = performances;
            this.renderGraph(performances);
          },
          error => this.openSnackBar(error)
        )
  }

  renderGraph(performances: StudentPaperPerformance[]): void {
    let subjects: any[] = [];
    let exams: any[] = [];
    let points: any[] = [];

    this.seriesGroups[0].series = [];

    this.title = this.selectedStudent.user.first_name + '\'s trend per subject';
    this.description = 'Performance over the past exams';

    for(let performance of performances) {
      let subject =  performance.class_performance.paper.subject.name;

      if(! subjects.includes(subject)){
        this.seriesGroups[0].series.push({
          dataField: subject,
          displayText: subject
        });

        subjects.push(subject)
      }
    }

    this.resultsData = [];
    for(let performance of performances){
      let exam_id = performance.class_performance.paper.exam.id;
      let exam_name = performance.class_performance.paper.exam.name;

      if(! exams.includes(exam_id)){
        let obj = {};
        obj['Exam'] = exam_name;
        points.push(obj);
        exams.push(exam_id);
      }

      let key = performance.class_performance.paper.subject.name;
      points.find(item => item.Exam == exam_name)[key] = performance.mark;

    }

    for(let point of points){
      this.resultsData.push(point);
    }

    this.studentLineChart.update();
  }


  openDropdown(event: any): void {
    if(this.firstLoad){
      $(event.target).dropdown('toggle');

      $('.ui.button.dropdown')
        .dropdown();

      this.firstLoad = false;
    }
  }

  onSelectStudent(student: Student): void {
    this.selectedStudent = student;

    this.getStudentPerformances();
  }
  openSnackBar(message? : string, duration: number = 3000) {
    this.snackBar.open(message, 'Dismiss' ,{
      duration: duration
    });
  }
}
