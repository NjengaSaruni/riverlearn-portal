/**
 * Created by saruni on 9/10/17.
 */

import {Component, OnInit} from '@angular/core';
import {User} from '../../common/models/users.models';
import {UserService} from '../../common/services/user.service';
import {DivisionService} from '../../common/services/divisions.service';
import {Class, Level, Stream, Teacher} from '../../common/models/divisions.models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {delay} from '../../common/services/common.service';


declare var $: any;

@Component({
  selector: 'class-form',
  templateUrl: './class-form.component.html',
  styleUrls: [
    './class-form.component.css'
  ]
})

export class ClassFormComponent implements OnInit {
  private contentReady: boolean;
  private classForm: FormGroup;
  private createdClass: Class;
  private classes: Class[];

  private user: User;
  private teachers: Teacher[];

  private selectedLevel: Level;
  private levels: Level[];
  private streams: Stream[];

  private errorMessage: string;

  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private divisionService: DivisionService
  ){}

  ngOnInit(): void {
    this.getUser();
    this.getLevels();
    this.getStreams();
    this.getTeachers();
    this.getClasses();

    // TODO: Edit delete classes
    $(document).ready(function() {

      $('.cards .card').dimmer({
        on: 'hover'
      });

      $('.ui.dropdown').dropdown();

      $('.ui.accordion').accordion();
    });

    this.classForm = this.formBuilder.group({
      level :['', Validators.required],
      stream : ['', Validators.required],
      class_teacher: ['']
    });

  }

  getUser(): void {
    this.userService.getLoggedInUser()
      .subscribe(
        user => this.user = user,
        error => this.errorMessage = <any>error);
  }

  getLevels(): void {
      this.divisionService.getLevels()
        .subscribe(
          levels => this.levels = levels,
          error => this.errorMessage = error
        )
  }

  getStreams(): void {
    this.divisionService.getStreams()
      .subscribe(
        streams => this.streams = streams,
        error => this.errorMessage = error
      )
  }

  getTeachers(): void {
    this.divisionService.getTeachers()
      .subscribe(
        teachers => this.teachers = teachers,
        error => this.errorMessage = error
      )
  }

  getClasses(): void {
    this.divisionService.getClasses()
      .subscribe(
        classes => {
          this.contentReady = true;
          this.classes = classes;
        },
        error => this.errorMessage = error
      )
  }

  async createClass() {
    let level = this.classForm.get('level').value;
    let stream = this.classForm.get('stream').value;
    let class_teacher = this.classForm.get('class_teacher').value;
    await delay(400);
    this.divisionService.createClass(stream, level, class_teacher)
      .subscribe(
        () => {
          this.getClasses();
          $('.ui.accordion.content').transition('slide out');
        },

        error => this.errorMessage = error,
      )
  }

  onSelectLevel(level: Level){
      this.selectedLevel = level;
  }

}
