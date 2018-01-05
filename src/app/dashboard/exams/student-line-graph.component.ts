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

  examPerformances: StudentPaperPerformance[];
  studentPerformances: StudentPaperPerformance[];
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

  getStudentPerformances(exam?: string): void {
      console.log(exam);
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
          displayText: subject
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
    this.selectedStudent = student;

    this.getStudentPerformances();
  }

  toggleComments(): void {
    $('#comments').transition('scale');
  }
  openSnackBar(message? : string, duration: number = 3000) {
    this.snackBar.open(message, 'Dismiss' ,{
      duration: duration
    });
  }
}
