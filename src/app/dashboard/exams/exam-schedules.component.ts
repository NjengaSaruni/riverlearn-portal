/**
 * Created by saruni on 10/3/17.
 */

import { Component, OnInit, ViewChild} from '@angular/core';
import {ExamService} from '../../common/services/exams.service';
import {Exam, ExamPaper} from '../../common/models/exams.models';
import { jqxSchedulerComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxscheduler';

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

  ngOnInit () {
    this.getExams();
    this.getExamPapers();
  }

  getExamPapers(): void {
    this.examService.getExamPapers()
      .subscribe(
        papers => {
          this.examPapers = papers;
          for (let paper of papers) {
            this.addNewAppointment(paper);
          }
        },
        error => alert(error)
      );
  }

  updateAppointments(): void {
    this.source['localData'] = this.appointments;
    this.dataAdapter = new jqx.dataAdapter(this.source);
    try {
      this.scheduler.ensureAppointmentVisible(this.examPapers[0].id);
    }
    catch(err){
      // TODO what to do with this error?
    }
  }

  addNewAppointment(paper: ExamPaper): any {
    let appointment = {
      "id" : paper.id,
      "description": paper.exam.description,
      "room": paper.location.name,
      "subject": paper.subject.name,
      "class": paper.csv_file.title,
      'start': paper.start,
      'end': paper.end
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
        { name: 'room', type: 'string' },
        { name: 'subject', type: 'string' },
        { name: 'class', type: 'string' },
        { name: 'start', type: 'date' },
        { name: 'end', type: 'date' }
      ],
      id: 'id',
      localData: this.appointments
    };
  dataAdapter: any = new jqx.dataAdapter(this.source);
  appointmentDataFields: any =
    {
      from: "start",
      to: "end",
      id: "id",
      description: "description",
      room: "room",
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
      'agendaView',
      'dayView',
      'weekView',
      'monthView'
    ];
}

