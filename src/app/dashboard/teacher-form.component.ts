/**
 * Created by saruni on 9/23/17.
 */

import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {delay} from '../common/services/common.service';
import {User} from '../common/models/users.models';
import {UserService} from '../common/services/user.service';
import {InstitutionSubject, Parent} from '../common/models/divisions.models';
import {DivisionService} from '../common/services/divisions.service';

declare var $: any;

@Component({
  selector: 'teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css' ]
})

export class TeacherFormComponent implements OnInit, AfterViewInit {
  public contentReady: boolean;
  public usernameTouched: boolean;
  public teacherForm: FormGroup;
  public incorrectUsernameFormat: boolean;
  public comparingUsernames: boolean;
  public usernameTaken: boolean;
  public users: User[];
  public parents: Parent[];

  public genders: any[] = [
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

  public subjects: InstitutionSubject[];

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public divisionService: DivisionService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getSubjects();

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

    this.teacherForm = this.formBuilder.group({
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
      gender: ['', Validators.required],
      email: [''],
      subjects: [ [], Validators.required],
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
      this.teacherForm.patchValue({
        username: this.teacherForm.get('first_name').value.toLowerCase().split(' ')[0] + this.teacherForm.get('last_name').value.toLowerCase().split(' ')[0]
      });
      value = this.teacherForm.get('username').value.toLowerCase()
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

  getSubjects(): void {
    this.divisionService.getSubjects()
      .subscribe(
        subjects => this.subjects = subjects,
        error => alert(error)
      )
  }

  createTeacher(): void {
    let user: User = new User();

    user.username = this.teacherForm.get('username').value;
    user.first_name = this.teacherForm.get('first_name').value;
    user.last_name = this.teacherForm.get('last_name').value;
    user.middle_name = this.teacherForm.get('middle_name').value;
    user.password = this.teacherForm.get('password').value;
    user.gender = this.teacherForm.get('gender').value;
    user.email = this.teacherForm.get('email').value;

    let subjects = this.teacherForm.get('subjects').value;

    this.divisionService.createTeacher(user, subjects)
      .subscribe(
        teacher => {
          $('#teacher-created').modal('show');
        },
        error => alert(error)
      );
  }
}
