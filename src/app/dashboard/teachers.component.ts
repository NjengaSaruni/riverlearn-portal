/**
 * Created by saruni on 8/16/17.
 */

import { Component, OnInit} from '@angular/core';
import {DivisionService} from '../common/services/divisions.service';
import {Teacher} from '../common/models/divisions.models';

declare var $: any;

@Component({
  selector: 'teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css' ]
})

export class TeachersComponent implements OnInit {
  private teachers: Teacher[];
  private contentReady: boolean;
  constructor(
    private divisionService: DivisionService
  ) {

  }

  ngOnInit() {
    this.getTeachers();
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

  hideCards() {
    this.getTeachers();
    $('.dimmable.segment').transition({
      animation: 'slide',
      duration: 500
    })
  }
}
