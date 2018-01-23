/**
 * Created by saruni on 8/16/17.
 */

import { Component, OnInit} from '@angular/core';
import {DivisionService} from '../common/services/divisions.service';
import {Teacher} from '../common/models/divisions.models';
import {UserService} from "../common/services/user.service";
import {User} from "../common/models/users.models";

declare var $: any;

@Component({
  selector: 'teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css' ]
})

export class TeachersComponent implements OnInit {
  user: User;
  protected teachers: Teacher[];
  protected contentReady: boolean;

  protected color = 'primary';
  protected mode = 'indeterminate';
  protected value = 50;
  protected bufferValue = 75;

  constructor(
    private divisionService: DivisionService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getTeachers();
    this.getUser();
  }

  getTeachers() {
    this.contentReady = false;
    this.divisionService.getTeachers()
      .subscribe(
        teachers => {
          this.contentReady = true;
          this.teachers = teachers;
        },
        error => alert(error)
      );
  }

  getUser(): void {
    this.userService.getLoggedInUser()
      .subscribe(
        user => this.user = user,
        error => alert(error)
      )
  }
  hideCards() {
    this.getTeachers();
    $('.dimmable.segment').transition({
      animation: 'slide',
      duration: 500
    })
  }
}
