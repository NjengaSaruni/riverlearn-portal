/**
 * Created by saruni on 10/3/17.
 */

import { Component, OnInit, ViewChild} from '@angular/core';
import {ExamService} from '../../common/services/exams.service';
import {Exam, ExamPaper} from '../../common/models/exams.models';
import { jqxSchedulerComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxscheduler';
import { MatSnackBar} from "@angular/material";
import {UserService} from "../../common/services/user.service";
import {User} from "../../common/models/users.models";

declare var $: any;

@Component({
  selector: 'exam-schedules',
  templateUrl: './exam-schedules.component.html',
  styleUrls: ['./exam-schedules.component.css' ]
})

export class ExamSchedulesComponent implements OnInit {
  public selectedExam: Exam = null;
  @ViewChild('schedulerReference') schedulerReference: jqxSchedulerComponent;
  @ViewChild('schedulerReference1') schedulerReference1: jqxSchedulerComponent;
 public  contentReady: boolean = false;
 public  appointments = [];
 public  examPapers: ExamPaper[] = [];
  public exams: Exam[];
  public color = 'primary';
  public mode = 'indeterminate';
  public value = 50;
  public bufferValue = 75;
 public  user: User;

  constructor(
   public  examService: ExamService,
    public snackBar: MatSnackBar,
   public  userService: UserService) {
      this.getUser();
  }

  openSnackBar(message? : string, duration: number = 3000) {
    let snackBarRef = this.snackBar.open(message, 'Dismiss' ,{
      duration: duration
    });
  }

  getUser(): void {
    this.userService.getLoggedInUser()
      .subscribe(
        user => this.user = user,
        error => this.openSnackBar(error)
      )
  }

  getExams(): void {
    this.examService.getExams()
      .subscribe(
        exams => {
          this.exams = exams;
          this.exams[0].selected = true;
          this.selectedExam = this.exams[0];
        },
        error => this.openSnackBar(error)
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
    this.contentReady = false;
    this.examService.getExamPapers()
      .subscribe(
        papers => {
          this.examPapers = papers;
          this.contentReady = true;
          for (let paper of papers) {
            this.addNewAppointment(paper);
          }
        },
        error => this.openSnackBar(error)
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
      this.schedulerReference1.ensureAppointmentVisible(this.examPapers[0].id);
    }
    catch(err){
      // TODO what to do with this error?
    }
  }

  addNewAppointment(paper: ExamPaper): any {
    let appointment = {
      'id' : paper.id,
      'location': paper.location.name,
      'subject': paper.subject.name,
      'class': paper.subject.name,
      'start': paper.start,
      'end': paper.end,
      'style': 'dark'
    };

    this.appointments.push(appointment);
    this.updateAppointments();
  }

  onSelectExam(event: any, selected_exam: Exam): void {
    $(event.target).transition('pulse');
    $('.twelve.wide.stretched.column').transition('slide left').transition('slide down');
    this.exams.find(exam => exam.id == selected_exam.id).selected = true;
    this.selectedExam = this.exams.find(exam => exam.id == selected_exam.id);

    this.exams.filter(exam => {
      if(exam.id != selected_exam.id){
        exam.selected = false;
        return exam;
      }
    });
  }

  onPaperSaved(event: any) {
    this.getExamPapers();
    $('#new-exam-paper-modal').modal('hide');
  }

  onScheduleSaved(event: any) {
    this.getExams();
    $('#new-exam-cycle-modal').modal('hide');
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
      resourceId: 'class'
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

