import {User} from "../common/models/users.models";
/**
 * Created by saruni on 1/23/18.
 */

declare var $: any;

let getUser = function (id: string) {
  this.userService.getUser(id)
    .subscribe(
      user => {
        this.loggedInUser = user;
        this.titleService.setTitle(user.full_name + ' :: RiverLearn');
        this.userProfile = user.profiles[0];
      },
      error => this.openSnackBar(error)
    );
};

import {Component, Input, OnInit} from "@angular/core";
import {Hero} from "../heroes/hero";
import {ActivatedRoute} from "@angular/router";
import {DivisionService} from "../common/services/divisions.service";
import { Location } from '@angular/common';
import {MatSnackBar} from "@angular/material";
import {Student} from "../common/models/divisions.models";

@Component({
  selector: 'student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css' ]
})
export class StudentDetailComponent implements OnInit {
  loadingStudent: boolean;
  student: Student;
  @Input() hero: Hero;

  constructor(
    public route: ActivatedRoute,
    public divisionService: DivisionService,
    public location: Location,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    $('html,body').animate({scrollTop:0},0);
    this.getStudent();
  }

  getStudent(): void {
    this.loadingStudent = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.divisionService.getStudent(id)
      .subscribe(
        student => {
          this.student = student;
          this.loadingStudent = false;
        },
        error => this.openSnackBar(error)
      );
  }
  openSnackBar(message? : string, duration: number = 3000) {
    this.snackBar.open(message, 'Dismiss' ,{
      duration: duration
    });
  }

  getUser(id: string): User{
    let user: User = null;
    getUser.call(this, id);
    return user;
  }

  goBack(): void {
    this.location.back();
  }


}
