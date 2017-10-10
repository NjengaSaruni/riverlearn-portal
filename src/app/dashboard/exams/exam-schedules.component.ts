/**
 * Created by saruni on 10/3/17.
 */

import {Component, OnInit, ViewChild} from '@angular/core';
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

export class ExamSchedulesComponent implements OnInit {
  @ViewChild('barGaugeReference') myBarGauge: jqxBarGaugeComponent;
  @ViewChild('schedulerReference') scheduler: jqxSchedulerComponent;

  ngAfterViewInit(): void {
    this.myBarGauge.createComponent(this.settings);
    this.scheduler.createComponent();
  }

  generateAppointments(): any
  {
    let appointments = new Array();

    let appointment1 = {
      id: "id1", description: "George brings projector for presentations.", location: "", subject: "Quarterly Project Review Meeting", calendar: "Room 1",
      start: new Date(2016, 10, 23, 9, 0, 0),
      end: new Date(2016, 10, 23, 16, 0, 0)
    };
    let appointment2 = {
      id: "id2", description: "",
      location: "", subject: "IT Group Mtg.", calendar: "Room 2",
      start: new Date(2016, 10, 24, 10, 0, 0),
      end: new Date(2016, 10, 24, 15, 0, 0)
    };

    appointments.push(appointment1);
    appointments.push(appointment2);

    return appointments;
  }

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
    }

  dataAdapter: any = new jqx.dataAdapter(this.source);
  date: any = new jqx.date(2016, 11, 23);

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
      colorScheme: "scheme05",
      dataField: "calendar",
      source: new jqx.dataAdapter(this.source)
    };

  views: string[] =
    [
      'weekView',
      'monthView'
    ];

  private contentReady: boolean = false;
  private exams: Exam[];

  settings: any = {
    width: 600,
    height: 600,
    max: 150,
    values: [102, 115, 130, 137, 10, 110],
    colorScheme: "scheme02",
    tooltip: {
      visible: true,
      formatFunction: (value: string) => {
        let realVal = parseInt(value);
        return ('Year: 2016<br />Price Index:' + realVal);
      }
    }
  }

  constructor(
    private examService: ExamService
  ) {}


  ngOnInit() {
    this.getExams();

  }

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
}

