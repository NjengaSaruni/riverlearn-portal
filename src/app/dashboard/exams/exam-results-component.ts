/**
 * Created by saruni on 10/17/17.
 * @license
 *
 * Copyright RiverLearn Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://riverlearn.com/license
 */
import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DivisionService} from "../../common/services/divisions.service";
import {ExamService} from "../../common/services/exams.service";
import {MatSnackBar} from "@angular/material";
import {Class, InstitutionSubject, Level} from "../../common/models/divisions.models";
import {ClassExamPaperPerformance, ClassExamResult, Exam} from "../../common/models/exams.models";
import { jqxChartComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxchart';

declare var $: any;

@Component({
  selector: 'results',
  templateUrl: './exam-results-component.html',
  styleUrls: ['./exam-results-component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExamResultsComponent implements OnInit, AfterViewInit {
  loadingPaperPerformances: boolean;
  retrievingResults: boolean;
  meanForResult: number;
  loadingResults: boolean;
  subjects: InstitutionSubject[];
  selectedExam: Exam;
  exams: Exam[];
  current: number = 15;
  @ViewChild('myChart') myChart: jqxChartComponent;

  description: string;
  title: string;
  selectedResult: ClassExamResult;
  selectedClass: Class;
  examResults: ClassExamResult[];
  selectedLevel: Level;
  levels: Level[];
  classes: Class[];

  public color = 'primary';
  public mode = 'indeterminate';
  public value = 50;
  public bufferValue = 75;

  resultsData = [];

  xAxis: any = {
    dataField: "Subject",
  };

  valueAxis: any =
    {
      visible: true,
      minValue: 0,
      maxValue: 100
    };

  colorScheme: string = "scheme01";
  markThreshHold = 70;
  markThreshLow = 30;

  seriesGroups: any[] = [{
    type: "column",
    orientation: "vertical",
    series: [{
      dataField: "Mean",
      displayText: "Mean for the class",
      colorFunction: (value: any, itemIndex: any, serie: any, group: any): any => {
        return (value <= this.markThreshHold) ? '#0e5a77' : '#cd9a36';
      },
      showLabels: true
    }],
    bands:
      [
        {
          minValue: this.markThreshHold,
          maxValue: this.markThreshHold,
          lineWidth: 1,
          color: 'green'
        },
        {
          minValue: this.markThreshLow,
          maxValue: this.markThreshLow,
          lineWidth: 1,
          color: 'red'
        }
      ]
  }];

  isBrazilAdded = false;
  public selectedPaperPerformance: ClassExamPaperPerformance;

  constructor(
    public divisionService: DivisionService,
    public examService: ExamService,
    public snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    this.getLevels();
    this.getExams();
    $('.ui.search')
      .search({
        source: this.levels
      })
    ;

    $('#levels-dropdown')
      .dropdown();

    $('#select-result-modal')
      .modal({
        blurring: true
      })
      .modal('show')
    ;
  }

  ngAfterViewInit(): void {
      $('.ui.dropdown')
        .dropdown()
  }


  openSnackBar(message? : string, duration: number = 3000) {
    this.snackBar.open(message, 'Dismiss' ,{
      duration: duration
    });
  }

  getExams(): void {
      this.examService.getExams()
        .subscribe(
          exams => this.exams = exams,
          error => this.openSnackBar(error)
        )
  }
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
            this.examResults = results;
            this.loadingResults = false;
            this.retrievingResults = false;
          },
          error => this.openSnackBar(error)
        );
  }

  getSubjects(): void {
      this.divisionService.getSubjects()
        .subscribe(
          subjects => this.subjects = subjects,
          error => this.openSnackBar(error)
        )
  }

  onSelectLevel(level: Level): void {
    this.selectedLevel = level;
    this.getClasses();
  }

  onSelectClass(_class: Class): void {
    this.retrievingResults = true;
    this.selectedClass = _class;
    this.getExamResults();
  }

  onFetchResults(): void {
      this.loadingResults = true;
      if(this.examResults.length == 0){
        this.openSnackBar('No results for this class')
      }
  }

  onClickClasses(): void {
    if(! this.selectedLevel) {
      this.openSnackBar('Please select a level');
    }
  }

  onSelectResult(result: ClassExamResult): void {
    this.title = result.exam.name;
    this.description = result._class.name;
    this.selectedResult = result;

    this.resultsData = [];

    let total = 0;
    let i = 0;


    // Prepare subjects uniquely
    for(let performance of result.paper_performances){
      total += performance.mean;
      i++;
      this.resultsData.push({
        Subject: performance.paper.subject.name,
        Mean: parseFloat(performance.mean.toFixed(2)),
        Id: performance.id
      });

    }

    if(i > 0){
      this.meanForResult = total/i;
    }

    this.myChart.update();
  }

  chartEvent(event: any): any {
    this.loadingPaperPerformances = true;
    let id: string = this.resultsData[event.args['elementIndex']].Id;
    this.getPerformance(id);
  }

  selectPerformance(performance?: ClassExamPaperPerformance): void {
    this.getPerformance(performance.id)
  }

  public getPerformance(id: string) {
    $('#student-results').modal('refresh');
    this.examService.getClassExamPaperPerformance(id)
      .subscribe(
        performance => {
          this.selectedPaperPerformance = performance;
          this.loadingPaperPerformances = false;
          $('#student-results').modal('show')
        },
        error => this.openSnackBar(error)
      )
  }
}
