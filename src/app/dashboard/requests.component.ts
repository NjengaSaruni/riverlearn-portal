/**
 * Created by saruni on 8/24/17.
 */

import { Component, OnInit} from '@angular/core';
import {JoinRequest} from '../common/models/users.models';
import {UserService} from '../common/services/user.service';
import {delay} from '../common/services/common.service';

declare var $: any;

@Component({
  selector: 'requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css' ]
})

export class RequestsComponent implements OnInit {
  private teacherRequests: JoinRequest[];
  private parentRequests: JoinRequest[];
  private studentRequests: JoinRequest[];
  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getRequests();
  }

  getRequests() {
    this.userService.getInstitutionRequests('Teacher')
      .subscribe(
        requests => this.teacherRequests  = requests,
        error => console.log(error)
      );
    this.userService.getInstitutionRequests('Parent')
      .subscribe(
        requests => this.parentRequests  = requests,
        error => console.log(error)
      );
    this.userService.getInstitutionRequests('Student')
      .subscribe(
        requests =>  this.studentRequests  = requests,
        error => console.log(error)
      );
  }

  acceptRequest(request: JoinRequest, event: any){
    this.sendRequest(request, true);
    this.hideRow(request, event);
  }

  declineRequest(request: JoinRequest, event: any){
    this.sendRequest(request, false);
    this.hideRow(request, event);
  }

  async hideRow(request: JoinRequest, event: any){
    $(event.target || event.srcElement).parents('tr').transition('slide out');
    $(event.target || event.srcElement).parents('.card').transition('slide out');
    await delay(300);
    if(request.created_by.account_type.name == 'Student'){
      this.studentRequests = this.studentRequests.filter(item => item.id !== request.id);
    }
    else if(request.created_by.account_type.name == 'Parent'){
      this.parentRequests = this.parentRequests.filter(item => item.id !== request.id);
    }
    else{
      this.teacherRequests = this.teacherRequests.filter(item => item.id !== request.id)
    }

    this.getRequests();
  }

  sendRequest(request: JoinRequest, approved: boolean){
    this.userService.patchRequest(request.id, approved).subscribe(
      data => console.log(data),
      error => console.log(error)
    )
  }


}

