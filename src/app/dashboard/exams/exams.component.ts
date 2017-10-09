/**
 * Created by saruni on 9/24/17.
 */

import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {User} from '../../common/models/users.models';
import {UserService} from '../../common/services/user.service';

declare var $: any;

@Component({
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  private user: User;

  private errorMessage: string;

  constructor(
    private userService: UserService,
    private titleService: Title
  ) {}

  public ngOnInit(){
    this.titleService.setTitle("Examinations");
  }

  getUser(): void {
    this.userService.getLoggedInUser()
      .subscribe(
        user => this.user = user,
        error => this.errorMessage = <any>error);
  }

}
