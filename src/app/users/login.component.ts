/**
 * Created by saruni on 4/9/17.
 */

import { Component, EventEmitter, OnInit} from '@angular/core';
import { UserService } from '../common/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {  Response } from '@angular/http';
import {delay} from '../common/services/common.service';
import {Token} from '../common/models/users.models';

declare var $: any;

@Component({
  selector: 'login',
  templateUrl:  './login.component.html',
  styleUrls:  ['./login.component.css'],
  providers: [ UserService ],
  outputs: ['onLogin', 'onLoginLoad']
})

export class LoginFormComponent implements OnInit{
  public token: Token;
  errorMessage: string;
  loggedIn: boolean = false;

  onLogin = new EventEmitter<boolean>();
  onLoginLoad = new EventEmitter<string>();

  public loginErrorOccured: boolean = false;
  public loggingIn: boolean = false;
  public firstLoginAttempt: boolean = true;
  loginErrorMessage: string = 'Incorrect username or password.';
  loginErrorMessageTitle: string = 'Please try again.';

  serverErrorOccured: boolean = false;
  serverErrorMessage: string = 'The are problems connecting to our server.';
  serverErrorMessageTitle: string = 'Please try again later.';

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor (
    public userService: UserService,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.serverErrorOccured = false;
    this.loginErrorOccured = false;
    this.loggingIn = false;
    this.onLoginLoad.emit('Login');
  }

  closeLoginModal() {
    this.loginErrorOccured = false;
    $('#loginModal')
      .modal('hide');
  }

  closeLoginErrorOccuredMessage(){
    this.loginErrorOccured = false;
    $('#logginErrorOccurredMessage')
      .transition('slide out');
  }

  closeServerErrorOccuredMessage(){
    this.serverErrorOccured = false;
    $('#serverErrorOccurredMessage')
      .transition('slide out');
  }

  closeOpenRegistration() {
    $('#loginModal')
      .modal('hide');
    $('#registerModal')
      .modal('show');
  }

  auth(event: any) {
    this.firstLoginAttempt = false;
    let username = this.loginForm.get('username').value;
    let password = this.loginForm.get('password').value;
    let remember = this.loginForm.get('remember').value;
    this.userService.auth(username, password)
      .subscribe(
        data => {
          this.token = data;
          $('#logginErrorOccurredMessage')
            .on('click', function() {
              $(this)
                .closest('.message')
                .transition('fade')
              ;
            })
          ;
          this.userService.saveJwt(this.token.token, remember, event);
          this.loginErrorOccured = false;
          this.serverErrorOccured = false;
          this.loggingIn = true;
          this.onLogin.emit(event);
        },
        error => this.handleLoginError(error),
        async function () {
          await
          delay(300)
        });
  }


  handleLoginError(error: any){
    if(error.status >= 400){
      console.log(error);
      this.loginErrorOccured = true;
    }
    else {
      console.log(error);
      this.serverErrorOccured = true;
    }
    // this.errorMessage = error.status
    this.loggingIn = false;
  }
}



