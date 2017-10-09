/**
 * Created by saruni on 9/20/17.
 */

import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {delay} from '../common/services/common.service';
import {User} from '../common/models/users.models';
import {UserService} from '../common/services/user.service';
import {Class, Parent, Student} from '../common/models/divisions.models';
import {DivisionService} from '../common/services/divisions.service';

declare var $: any;

@Component({
  selector: 'parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.css' ]
})

export class ParentFormComponent implements OnInit, AfterViewInit {
  private contentReady: boolean;
  private usernameTouched: boolean;
  private parentForm: FormGroup;
  private incorrectUsernameFormat: boolean;
  private comparingUsernames: boolean;
  private usernameTaken: boolean;
  private users: User[];
  private classes: Class[];
  private parents: Parent[];
  private students: Student[];
  private selectedStudents: Student[];
  private errors: string[] = [];

  private genders: any[] = [
    {
      value: 'M',
      name : 'MALE'
    },
    {
      value: 'F',
      name : 'FEMALE'
    },
    {
      value: 'O',
      name : 'OTHER'
    }
  ];

  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private divisionService: DivisionService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getClasses();
    this.getStudents();

    $(document).ready(function() {
      $('.ui.dropdown').dropdown();

      $('.ui.accordion').accordion();

      $('#search-parents')
        .popup({
          inline     : true,
          position   : 'bottom left',
          on: 'click',
          delay: {
            show: 300,
            hide: 800
          }
        })
      ;
    });

    this.parentForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      middle_name: '',
      last_name: ['', Validators.required],
      username: ['',
        [
          Validators.required,
          Validators.minLength(3),
        ]
      ],
      password: ['', Validators.required],
      students: [ [], Validators.required],
      gender: ['', Validators.required],
      email: [''],
    })
  }

  ngAfterViewInit(){
    this.contentReady = true;
  }

  onKey(event: any) {
    // Compare username with those from database
    let value: string;
    if (event.target.name === 'username') {
      this.usernameTouched = true;
      value = event.target.value.toLowerCase();
    }
    else if (!this.usernameTouched) {
      this.parentForm.patchValue({
        username: this.parentForm.get('first_name').value.toLowerCase().split(' ')[0] + this.parentForm.get('last_name').value.toLowerCase().split(' ')[0]
      });
      value = this.parentForm.get('username').value.toLowerCase()
    }

    this.compareUsernames(value);
  }

  async compareUsernames(value: string) {
    this.comparingUsernames = true;
    this.getUsers();
    let nameRegex = /^(\w){1,15}$/;
    this.incorrectUsernameFormat = !value.match(nameRegex);
    await delay(50);
    for (let user of this.users) {
      if (value === '' || value === user.username) {
        this.usernameTaken = true;
        break;
      }
      else {
        this.usernameTaken = false;
      }
    }
    this.comparingUsernames = false;
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(
        users => this.users = users,
        error => alert(error)
      );
  }

  getStudents(): void {
    this.divisionService.getStudents()
      .subscribe(
        students => this.students = students,
        error => alert(error)
      );
  }

  getClasses(): void {
    this.divisionService.getClasses()
      .subscribe(
        classes => this.classes = classes,
        error => alert(error)
      );
  }

  createParent(): void {
    let user: User = new User();

    user.username = this.parentForm.get('username').value;
    user.first_name = this.parentForm.get('first_name').value;
    user.last_name = this.parentForm.get('last_name').value;
    user.middle_name = this.parentForm.get('middle_name').value;
    user.password = this.parentForm.get('password').value;
    user.gender = this.parentForm.get('gender').value;
    user.email = this.parentForm.get('email').value;

    let students = this.parentForm.get('students').value;

    this.divisionService.createParent(user, students)
      .subscribe(
        parent => {
          $('#parent-created').modal('show');
        },
        error => alert(error)
      );
  }

  showSelectedStudents(): void {
    this.selectedStudents = [];
    this.errors = [];
    for(let student of this.parentForm.get('students').value){
      student = this.students.find(std => std.id === student);
      if(student.parent !== null){
        let error: string = student.user.first_name + '\'s parent has already to ' + student.parent.user.last_name;
        this.errors.push(error);
      }
    }
  }
}
