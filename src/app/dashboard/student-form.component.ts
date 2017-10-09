/**
 * Created by saruni on 8/18/17.
 */

import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {delay} from '../common/services/common.service';
import {User} from '../common/models/users.models';
import {UserService} from '../common/services/user.service';
import {Class, Parent} from '../common/models/divisions.models';
import {DivisionService} from '../common/services/divisions.service';

declare var $: any;

@Component({
  selector: 'student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css' ]
})

export class StudentFormComponent implements OnInit, AfterViewInit {
  private contentReady: boolean;
  private usernameTouched: boolean;
  private creatingParent: boolean;
  private studentForm: FormGroup;
  private incorrectUsernameFormat: boolean;
  private comparingUsernames: boolean;
  private usernameTaken: boolean;
  private users: User[];
  private classes: Class[];
  private parents: Parent[];
  private availableParents: Parent[];
  private searchLoading: boolean;
  private selectedParent: Parent;

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
    this.getParents();

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

    this.studentForm = this.formBuilder.group({
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
      class: ['', Validators.required],
      registration_number: [''],
      gender: ['', Validators.required],
      email: [''],
    })
  }

  ngAfterViewInit(){
    this.contentReady = true;
  }

  async onKey(event: any) {
    // Compare username with those from database
    let value: string;
    if (event.target.name === 'parent-username') {
      this.usernameTouched = true;
      value = event.target.value.toLowerCase();
    }
    else if (event.target.name === 'username') {
        this.usernameTouched = true;
        value = event.target.value.toLowerCase();
      }
    else if (!this.usernameTouched) {
      await delay(300);
      this.studentForm.patchValue({
        username: this.studentForm.get('first_name').value.toLowerCase().split(' ')[0] + this.studentForm.get('last_name').value.toLowerCase().split(' ')[0]
      });
      value = this.studentForm.get('username').value.toLowerCase()
    }

    this.compareUsernames(value);
  }

  compareUsernames(value: string): void {
    this.comparingUsernames = true;
    this.getUsers();
    let nameRegex = /^(\w){1,15}$/;
    this.incorrectUsernameFormat = !value.match(nameRegex);

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

  getClasses(): void {
    this.divisionService.getClasses()
      .subscribe(
        classes => this.classes = classes,
        error => alert(error)
      );
  }

  createStudent(): void {
    let user: User = new User();
    let parent: string;

    user.username = this.studentForm.get('username').value;
    user.first_name = this.studentForm.get('first_name').value;
    user.last_name = this.studentForm.get('last_name').value;
    user.middle_name = this.studentForm.get('middle_name').value;
    user.password = this.studentForm.get('password').value;
    user.gender = this.studentForm.get('gender').value;
    user.email = this.studentForm.get('email').value;

    let registration_number = this.studentForm.get('registration_number').value;
    let current_class = this.studentForm.get('class').value;

    if (this.selectedParent.id !== null) {
      parent = this.selectedParent.id;
    }

    this.divisionService.createStudent(user, current_class, registration_number, parent)
      .subscribe(
        student => {
          $('#student-created').modal('show');
        },
        error => alert(error)
      );
  }

  getParents(): void {
    this.divisionService.getParents()
      .subscribe(
        parents => this.parents = parents,
        error => alert(error)
      );
  }

  toggleCreatingParent(){
    this.creatingParent === true ? this.creatingParent = false : this.creatingParent = true;
  }

  selectParent(parent: Parent): void {
    this.selectedParent = parent;
  }

  onKeysearch(event: any): void {
    // This function would replace the functionality of semantic ui search selection dropdown. Further work required.
    let value = event.target.value;
    if (value === '' || value === null){
      this.availableParents = [];
      return;
    }
    this.searchLoading = true;
    this.divisionService.getParents()
      .subscribe(
        parents => {
          return this.availableParents = parents.filter(searchParents);
        }
      );

    function searchParents(parent: Parent): boolean {
      return parent.user.full_name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
        || parent.user.username.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
        || parent.user.first_name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
        || parent.user.last_name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
    }
    this.searchLoading = false;
  }
}
