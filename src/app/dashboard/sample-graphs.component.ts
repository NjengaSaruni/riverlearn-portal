/**
 * Created by saruni on 8/2/17.
 */

import {Component,  OnInit} from '@angular/core';
import {ExamService} from "../common/services/exams.service";
import {ClassExamResult, Exam} from "../common/models/exams.models";
import {MatSnackBar} from "@angular/material";
import {DivisionService} from "../common/services/divisions.service";
import {Class, Level} from "../common/models/divisions.models";

declare var $: any;

@Component({
  selector: 'sample-graphs',
  templateUrl: './sample-graphs.component.html',
  styleUrls: ['./sample-graphs.component.css']
})

export class SampleGraphsComponent implements OnInit {
  examResults: ClassExamResult[];
  selectedClass: Class;
  classes: Class[];
  selectedLevel: any;
  levels: Level[];
  exams: Exam[];
  results: ClassExamResult[];

  constructor(
    public examService: ExamService,
    public divisionService: DivisionService,
    public snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    $(document).ready(function() {
      $('.ui.dropdown').dropdown();
    });

    this.getLevels();
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
        results => this.examResults = results,
        error => this.openSnackBar(error)
      );
  }

  onSelectLevel(level: Level): void {
    this.selectedLevel = level;
    this.getClasses();
  }

  onSelectClass(_class: Class): void {
    this.selectedClass = _class;
    this.getExamResults();
  }

  openSnackBar(message? : string, duration: number = 3000) {
    this.snackBar.open(message, 'Dismiss' ,{
      duration: duration
    });
  }
  // lineChart
  public lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 90, 86, 27, 90],
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType:string = 'line';
  public lineChartType1:string = 'bar';
  public pieChartType:string = 'pie';
  public pieChartType1:string = 'doughnut';

  // Pie
  public pieChartLabels:string[] = ['Maths', 'Physics', 'Biology', 'Chemistry', 'English'];
  public pieChartData:number[] = [90, 80, 70, 67, 88];

  public randomizeType():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.lineChartType1 = this.lineChartType1 === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
    this.pieChartType1= this.pieChartType1 === 'doughnut' ? 'pie' : 'doughnut';
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  // lineChart
  public lineChartData1:Array<any> = [
    {data: [90, 99, 80, 81, 89, 90, 88], label: 'English'},
    {data: [80, 74, 71, 82, 86, 69, 75], label: 'Maths'},
    {data: [80, 74, 71, 82, 86, 69, 75], label: 'Chemistry'},
    {data: [90, 89, 80, 76, 89, 75, 88], label: 'Biology'}
  ];
  public lineChartLabels1:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType2:string = 'line';

  public randomize():void {
    let _lineChartData :Array<any> = [];
    let _lineChartLabels: Array<any> = [];

    for (let i = 0; i < this.examResults.length; i++) {
      _lineChartData.push({data: new Array(this.lineChartData1[i].data.length), label: this.examResults[i].exam.name});
      for (let j = 0; j < this.examResults[i].paper_performances.length; j++) {
        _lineChartData[i].data[j] = this.examResults[i].paper_performances[j].mean;
      }
    }
    this.lineChartData1 = _lineChartData;
  }

  // events
  public chartClicked1(e:any):void {
    console.log(e);
  }

  public chartHovered1(e:any):void {
    console.log(e);
  }
}
