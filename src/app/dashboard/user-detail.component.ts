/**
 * Created by saruni on 7/22/17.
 */

import {Component, OnInit} from '@angular/core';
import {UserService} from '../common/services/user.service';
import {User} from '../common/models/users.models';
import {ActivatedRoute, Params} from '@angular/router';
import {CommonService, JwtHelper} from '../common/services/common.service';

@Component({
  selector: 'profile',
  templateUrl: './user-detail.component.html',
  styleUrls: [
    './user-detail.component.css'
  ]
})

export class UserDetailComponent implements OnInit {
  private loggedInUser: User;
  jwtHelper: JwtHelper = new JwtHelper();

  private errorMessage: string;

  constructor(
    private commonService: CommonService,
    private userService: UserService
  ) {}

  public user: User;

  ngOnInit():void {
    let token = this.commonService.getJwtToken();
    let user = this.jwtHelper.decodeToken(token);
    this.getUser(user.user_id)
  }

  getUser(id: string): User{
    let user: User = null;
    this.userService.getUser(id)
      .subscribe(
        user => this.loggedInUser = user,
        error => this.errorMessage = <any>error);
    return user;
  }
}
