/**
 * Created by saruni on 1/1/18.
 */

import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {jqxChartComponent} from "jqwidgets-framework/jqwidgets-ts/angular_jqxchart";
import {ExamService} from "../../common/services/exams.service";
import {DivisionService} from "../../common/services/divisions.service";
import {Class, Level} from "../../common/models/divisions.models";
import {MatSnackBar} from "@angular/material";
import {ClassExamResult, Exam} from "../../common/models/exams.models";

declare var $: any;

@Component({
  selector: 'subject-line-graph',
  templateUrl: './subject-line-graph.component.html',
  styleUrls: ['./subject-line-graph.component.css'],
})
export class SubjectLineGraphComponent implements OnInit, AfterViewInit {
  loadingResults: boolean;
  classes: Class[];
  levels: Level[];
  selectedLevel: Level;
  selectedClass: Class;

  protected loadingGraph;
  protected color = 'primary';
  protected mode = 'indeterminate';
  protected value = 50;
  protected bufferValue = 75;

  protected firstLoad = true;

  @ViewChild('subjectLineChart') subjectLineChart: jqxChartComponent;

  constructor(
    private examService: ExamService,
    private divisionService: DivisionService,
    public snackBar: MatSnackBar
  ){}

  ngOnInit(): void {

    $('.ui.button.dropdown')
      .dropdown();

    this.getLevels();
  }

  ngAfterViewInit(): void {
    this.subjectLineChart.update();

    $('.ui.button.dropdown')
      .dropdown();
  }


  resultsData: Array<any> = [];

  xAxis: any = {
    dataField: "Exam",
  };

  valueAxis: any =
    {
      visible: true
    };

  colorScheme: string = "scheme02";

  seriesGroups: any[] = [{
    type: "spline",
    alignEndPointsWithIntervals: true,
    series: [
      { emptyPointsDisplay: 'skip', displayText: 'Value', lineWidth: 2, symbolSize: 8, symbolType: 'circle' }
    ],
  }];

  getLevels(): void {
    this.divisionService.getLevels()
      .subscribe(
        levels => this.levels = levels,
        error => this.openSnackBar(error)
      )
  }

  getClasses(): void {
    this.divisionService.getClasses(this.selectedLevel.id)
      .subscribe(
        classes => this.classes = classes,
        error => this.openSnackBar(error)
      )
  }

  getExamResults(): void {
    this.examService.getExamResults(null, this.selectedClass.id)
      .subscribe(
        results => {
          this.renderGraph(results);
        },
        error => this.openSnackBar(error)
      );
  }

  onSelectLevel(level: Level): void {
    this.selectedLevel = level;
    this.getClasses();
  }

  onSelectClass(_class: Class): void {
    if(_class == this.selectedClass){
      this.openSnackBar("You selected the same class!")
      return
    }
    this.loadingResults = true;
    this.loadingGraph = true;
    this.selectedClass = _class;
    this.getExamResults();
  }

  openSnackBar(message? : string, duration: number = 3000) {
    this.snackBar.open(message, 'Dismiss' ,{
      duration: duration
    });
  }

  openDropdown(event: any): void {
    if(this.firstLoad){
      $(event.target).dropdown('toggle');

      $('.ui.button.dropdown')
        .dropdown();

      this.firstLoad = false;
    }
  }

  printChart(): void {
    let content = this.subjectLineChart.host[0].outerHTML;
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

  renderGraph(results: ClassExamResult[]): void {
    let subjects: any[] = [];
    this.seriesGroups[0].series = [];

    for(let result of results) {
      for(let performance of result.paper_performances){
        if(! subjects.includes(performance.paper.subject.name)){
          this.seriesGroups[0].series.push({
            dataField: performance.paper.subject.name,
            displayText: performance.paper.subject.name
          });
          subjects.push(performance.paper.subject.name)
        }
      }
    }

    this.resultsData = [];
    for(let result of results){

      let obj = {};
      obj['Exam'] = result.exam.name;
      for(let performance of result.paper_performances){
        let key = performance.paper.subject.name;
        obj[key] = performance.mean;
      }

      this.resultsData.push(obj);
    }

    this.subjectLineChart.update();
    this.loadingGraph = false;
  }
}
