/**
 * Created by saruni on 8/18/17.
 */


import {Component, OnInit} from '@angular/core';
import {CommonService, JwtHelper} from '../../common/services/common.service';
import {User} from '../../common/models/users.models';
import {UserService} from '../../common/services/user.service';

declare var $: any;

@Component({
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  public user: User;

  constructor(
    public commonService: CommonService,
    public userService: UserService,
  ) {}

  public ngOnInit(){
    this.getUser();
  }

  getUser(): void{
    let jwtHelper: JwtHelper = new JwtHelper();
    let errorMessage: string;
    let token = this.commonService.getJwtToken();
    let user = jwtHelper.decodeToken(token);
    this.userService.getUser(user.user_id)
      .subscribe(
        user => this.user = user,
        error => errorMessage = <any>error);
  }

}
