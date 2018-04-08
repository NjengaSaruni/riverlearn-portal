/**
 * Created by saruni on 9/24/17.
 */

import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {User} from '../../common/models/users.models';
import {UserService} from '../../common/services/user.service';
import {MatSnackBar} from "@angular/material";

declare var $: any;

@Component({
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
 public  user: User;

  constructor(
   public  userService: UserService,
   public  titleService: Title,
    public snackBar: MatSnackBar
  ) {}

  public ngOnInit(){
    this.titleService.setTitle("Examinations");
    this.getUser();

    $('.ui.dropdown').dropdown();
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

}
