/**
 * Created by saruni on 7/31/17.
 */


import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DivisionService} from '../common/services/divisions.service';
import {Student} from '../common/models/divisions.models';
import {User} from '../common/models/users.models';
import {UserService} from '../common/services/user.service';
import {delay} from '../common/services/common.service';

declare var $: any;

@Component({
  selector: 'students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css' ]
})

export class StudentsComponent implements OnInit {
  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }
  private students: Student[];
  private _user: User;
  private hideSearch: boolean;
  private contentReady: boolean;
  private searchText: string;
  private searchTextEmpty: boolean;
  private studentsTableHidden: boolean;
  private studentFormButtonHidden: boolean;

  constructor(
    private divisionService: DivisionService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getStudents();
    this.getUser();

    $(document).ready(function() {
      $('.ui.dropdown').dropdown();

      $('.ui.accordion').accordion();
    });

  }

  getUser(): void {
    this.userService.getLoggedInUser()
      .subscribe(
        user => this._user = user,
        error => alert(error)
      )
  }

  getStudents() {
    this.contentReady = false;
    this.divisionService.getStudents()
      .subscribe(
        students => {
          this.contentReady = true;
          this.students = students;
        },
        error => alert(error)
      );
  }

  toggleStudentsTable() {
    this.studentsTableHidden ? this.studentsTableHidden = false : this.studentsTableHidden = true;
    this.studentFormButtonHidden ? this.studentFormButtonHidden = false: this.studentFormButtonHidden = true;
  }

  showSearchInput() {
    this.hideSearch = false;
    if (!$('.right.floated.input').hasClass('visible')) {
      $('.right.floated.input').transition('slide in');
    }
  }

  searchStudents(event: any) {
    this.searchTextEmpty = false;
    if(this.searchText !== '' || this.searchText === null)
    {
      this.contentReady = false;
      this.divisionService.getStudents(this.searchText)
        .subscribe(
          students => {
            this.contentReady = true;
            this.students = students;
          },
          error => alert(error)
        );
    }
    else {
      this.searchTextEmpty = true;
    }

  }

}

