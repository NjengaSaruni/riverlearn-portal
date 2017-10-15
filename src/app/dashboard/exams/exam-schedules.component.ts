/**
 * Created by saruni on 10/3/17.
 */

import {Component, OnInit, ViewChild} from '@angular/core';
import {ExamService} from '../../common/services/exams.service';
import {Exam, ExamPaper} from '../../common/models/exams.models';
import { jqxSchedulerComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxscheduler';
import {Appointment} from "../../common/models/widgets.models";

declare var $: any;

@Component({
  selector: 'exam-schedules',
  templateUrl: './exam-schedules.component.html',
  styleUrls: ['./exam-schedules.component.css' ]
})

export class ExamSchedulesComponent implements OnInit {
  @ViewChild('schedulerReference') scheduler: jqxSchedulerComponent;

  private contentReady: boolean = false;
  private appointments = [];
  private examPapers: ExamPaper[] = [];
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

  getExamPapers(): void {
    this.examService.getExamPapers()
      .subscribe(
        papers => {
          this.examPapers = papers;
          for(let paper of papers){
            this.addNewAppointment(paper);
          }
        },
        error => alert(error)
      );

  }
  ngOnInit () {
    this.getExams();
    this.getExamPapers();
  }

  updateAppointments(): void {
    // this.getExamPapers();
    this.source['localData'] = this.appointments;
    this.dataAdapter = new jqx.dataAdapter(this.source);
    this.scheduler.ensureAppointmentVisible(this.examPapers[0].id);
  }

  addNewAppointment(paper: ExamPaper): any {
    // let appointment = new Appointment(
    //   paper.id, paper.exam.description, "Some string", "Class 4", new Date(2016, 10, 26, 14, 0, 0), new Date(2016, 10, 26, 16, 0, 0)
    // );
    console.log(paper.start_time);
    console.log(paper.exam.start_date);
    let appointment = {
      "id" : paper.id,
      "description": paper.exam.description,
      "location": paper.location.name,
      "subject": paper.subject.name,
      "class": "Class 1",
      'start': new Date(2017, 9, 26, 14, 0, 0),
      'end': new Date(2017, 9, 26, 16, 0, 0)
    };

    this.appointments.push(appointment);
    this.updateAppointments();
  }

  source: any =
    {
      dataType: "array",
      dataFields: [
        { name: 'id', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'location', type: 'string' },
        { name: 'subject', type: 'string' },
        { name: 'class', type: 'string' },
        { name: 'start', type: 'date' },
        { name: 'end', type: 'date' }
      ],
      id: 'id',
      localData: this.appointments
    };
  dataAdapter: any = new jqx.dataAdapter(this.source);
  date: any = new jqx.date(2017, 10, 26);
  appointmentDataFields: any =
    {
      from: "start",
      to: "end",
      id: "id",
      description: "description",
      location: "location",
      subject: "subject",
      resourceId: "class"
    };
  resources: any =
    {
      colorScheme: "scheme01",
      dataField: "class",
      source: new jqx.dataAdapter(this.source)
    };
  views: any[] =
    [
      'dayView',
      'weekView',
      'monthView'
    ];
}

