/**
 * Created by saruni on 10/3/17.
 */

import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ExamService} from '../../common/services/exams.service';
import {Exam} from '../../common/models/exams.models';
import { jqxBarGaugeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxbargauge';
import { jqxSchedulerComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxscheduler';

declare var $: any;

@Component({
  selector: 'exam-schedules',
  templateUrl: './exam-schedules.component.html',
  styleUrls: ['./exam-schedules.component.css' ]
})

export class ExamSchedulesComponent implements OnInit, AfterViewInit {
  @ViewChild('schedulerReference') scheduler: jqxSchedulerComponent;

  private contentReady: boolean = false;
  exams: Exam[];

  constructor(
    private examService: ExamService
  ) {}

  getExams(): void {
    this.examService.getExams()
      .subscribe(
        exams => {
          this.contentReady = true;
          this.exams = exams;
        },
        error => alert(error)
      )
  }

  ngOnInit () {
    this.getExams();
  }

  ngAfterViewInit(): void {
    this.scheduler.createComponent();
  }

  generateAppointments(): any {
    let appointments = new Array();
    let appointment1 = {
      id: "id1",
      description: "George brings projector for presentations.",
      location: "",
      subject: "Quarterly Project Review Meeting",
      calendar: "Class 1",
      start: new Date(2017, 10, 23, 9, 0, 0),
      end: new Date(2017, 10, 23, 16, 0, 0)
    };
    let appointment2 = {
      id: "id2",
      description: "",
      location: "",
      subject: "IT Group Mtg.",
      calendar: "Class 2",
      start: new Date(2017, 10, 24, 10, 0, 0),
      end: new Date(2017, 10, 24, 15, 0, 0)
    };
    let appointment3 = {
      id: "id3",
      description: "",
      location: "",
      subject: "Course Social Media",
      calendar: "Class 3",
      start: new Date(2017, 10, 27, 11, 0, 0),
      end: new Date(2017, 10, 27, 13, 0, 0)
    };
    let appointment4 = {
      id: "id4",
      description: "",
      location: "",
      subject: "New Projects Planning",
      calendar: "Class 2",
      start: new Date(2017, 10, 23, 16, 0, 0),
      end: new Date(2017, 10, 23, 18, 0, 0)
    };
    let appointment5 = {
      id: "id5",
      description: "",
      location: "",
      subject: "Interview with James",
      calendar: "Class 4",
      start: new Date(2017, 10, 25, 15, 0, 0),
      end: new Date(2017, 10, 25, 17, 0, 0)
    };
    let appointment6 = {
      id: "id6",
      description: "",
      location: "",
      subject: "Interview with Nancy",
      calendar: "Class 5",
      start: new Date(2017, 10, 26, 14, 0, 0),
      end: new Date(2017, 10, 26, 16, 0, 0)
    };
    appointments.push(appointment1);
    appointments.push(appointment2);
    appointments.push(appointment3);
    appointments.push(appointment4);
    appointments.push(appointment5);
    appointments.push(appointment6);
    return appointments;
  };
  source: any =
    {
      dataType: "array",
      dataFields: [
        { name: 'id', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'location', type: 'string' },
        { name: 'subject', type: 'string' },
        { name: 'calendar', type: 'string' },
        { name: 'start', type: 'date' },
        { name: 'end', type: 'date' }
      ],
      id: 'id',
      localData: this.generateAppointments()
    };
  dataAdapter: any = new jqx.dataAdapter(this.source);
  date: any = new jqx.date(2017, 10, 11);
  appointmentDataFields: any =
    {
      from: "start",
      to: "end",
      id: "id",
      description: "description",
      location: "location",
      subject: "subject",
      resourceId: "calendar"
    };
  resources: any =
    {
      colorScheme: "scheme03",
      dataField: "calendar",
      source: new jqx.dataAdapter(this.source)
    };
  views: any[] =
    [
      'dayView',
      'weekView',
      'monthView'
    ];
}

