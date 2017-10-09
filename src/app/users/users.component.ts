/**
 * Created by saruni on 4/9/17.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../common/services/user.service';


@Component({
  selector: 'users',
  templateUrl:  './users.component.html',
  styleUrls:  ['./users.component.css'],
  providers: [ UserService ]
})

export class UsersComponent implements OnInit {
  errorMessage: string;
  mode = 'Observable';
  users: any[];
  hidden = true;

  constructor (
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        users => this.users = users,
        error => this.errorMessage = <any>error);
  }

  toggleUsers() {
    this.hidden = (this.hidden === true) ? false : true;
  }

  saveJwt(jwt: any) {
    if (jwt) {
      window.localStorage.setItem('token', jwt);
    }
  }

  // adduser(name: string) {
  //   if (!name) { return; }
  //   this.userService.create(name)
  //     .subscribe(
  //       user => this.users.push(user),
  //       error => this.errorMessage = <any>error);
  // }
}



