/**
 * Created by saruni on 10/3/17.
 */

import { Component, OnInit, ViewChild} from '@angular/core';
import {ExamService} from '../../common/services/exams.service';
import {Exam, ExamPaper} from '../../common/models/exams.models';
import { jqxSchedulerComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxscheduler';
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: 'exam-schedules',
  templateUrl: './exam-schedules.component.html',
  styleUrls: ['./exam-schedules.component.css' ]
})

export class ExamSchedulesComponent implements OnInit {
  protected selectedExam: Exam = null;
  @ViewChild('schedulerReference') schedulerReference: jqxSchedulerComponent;

  private contentReady: boolean = false;
  private appointments = [];
  private examPapers: ExamPaper[] = [];
  protected exams: Exam[];
  protected color = 'primary';
  protected mode = 'indeterminate';
  protected value = 50;
  protected bufferValue = 75;

  notes = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];

  constructor(
    private examService: ExamService,

  ) {

}

  getExams(): void {
    this.examService.getExams()
      .subscribe(
        exams => {
          this.exams = exams;
          this.exams[0].selected = true;
          this.selectedExam = this.exams[0];
        },
        error => alert(error)
      )
  }

  ngOnInit () {
    this.getExams();
    this.getExamPapers();

    $('.ui.sticky .menu').visibility({
      type: 'fixed',
      offset: 80
    });

    $('#ellipsis')
      .popup({
        on    : 'click',
        inline: true,
        hoverable  : true,
        position   : 'bottom left',
        delay: {
          show: 300,
          hide: 800
        }
      })
  }

  getExamPapers(): void {
    this.examService.getExamPapers()
      .subscribe(
        papers => {
          this.examPapers = papers;
          this.contentReady = true;
          for (let paper of papers) {
            this.addNewAppointment(paper);
          }
        },
        error => alert(error)
      );
  }

  toggleCycleModal(event: any){
    $('#new-exam-cycle-modal').modal('toggle')
  }

  togglePaperModal(event: any){
    $('#new-exam-paper-modal').modal('toggle')
  }


  updateAppointments(): void {
    this.source['localData'] = this.appointments;
    this.dataAdapter = new jqx.dataAdapter(this.source);
    try {
      this.schedulerReference.ensureAppointmentVisible(this.examPapers[0].id);
    }
    catch(err){
      // TODO what to do with this error?
    }
  }

  addNewAppointment(paper: ExamPaper): any {
    let appointment = {
      'id' : paper.id,
      'description': paper.csv_file.title,
      'location': paper.location.name,
      'subject': paper.subject.name,
      "class": paper.csv_file.title,
      'start': paper.start,
      'end': paper.end,
      'style': 'dark'
    };

    this.appointments.push(appointment);
    this.updateAppointments();
  }

  onSelectExam(event: any, selected_exam: Exam): void {
    this.exams.find(exam => exam.id == selected_exam.id).selected = true;
    this.selectedExam = this.exams.find(exam => exam.id == selected_exam.id);

    this.exams.filter(exam => {
      if(exam.id != selected_exam.id){
        exam.selected = false;
        return exam;
      }
    });
  }

  pdfExportClick(): void {
    this.schedulerReference.exportData('pdf');
  };

  openExam(event: any): void {
    console.log(event.args.appointment)
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
  appointmentDataFields: any =
    {
      from: 'start',
      to: 'end',
      id: 'id',
      description: 'description',
      location: 'location',
      subject: 'subject',
      resourceId: 'subject'
    };
  resources: any =
    {
      colorScheme: 'scheme01',
      dataField: 'subject',
      source: new jqx.dataAdapter(this.source)
    };
  views: any[] =
    [
      'agendaView',
      'dayView',
      {
        type: 'weekView',
        workTime : {
          fromDayOfWeek: 1,
          toDayOfWeek: 6,
          fromHour: 7,
          toHour: 18
        }
      },
      {
        type: 'monthView',
        showWeekNumbers: true
      }
    ];
}

