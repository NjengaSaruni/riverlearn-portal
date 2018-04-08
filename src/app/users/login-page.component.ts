/**
 * Created by saruni on 8/23/17.
 */

import { Component, EventEmitter, OnInit} from '@angular/core';
import { UserService } from '../common/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {delay} from '../common/services/common.service';
import {Token} from '../common/models/users.models';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'login-page',
  templateUrl:  './login-page.component.html',
  styleUrls:  ['./login-page.component.css'],
  providers: [ UserService ],
})

export class LoginPageComponent implements OnInit{
  public token: Token;
  public redirectUrl: string;

  errorMessage: string;
  loggedIn: boolean = false;

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
    public route: ActivatedRoute,
    public router: Router,
    public titleService: Title
  ) {

  }

  ngOnInit(): void {
    this.titleService.setTitle("RiverLearn - Login");
   this.route
     .queryParams
     .subscribe(
       params => {
         if(params['url']){
           this.redirectUrl = params['url']
         }
         else{
           this.redirectUrl = 'dashboard'
         }
       },
       error => console.log(error)
     );
    $(document)
      .ready(function() {
        $('.ui.form')
          .form({
            fields: {
              email: {
                identifier  : 'username',
                rules: [
                  {
                    type   : 'empty',
                    prompt : 'Please enter your e-mail'
                  },
                  {
                    type   : 'username',
                    prompt : 'Please enter a valid username'
                  }
                ]
              },
              password: {
                identifier  : 'password',
                rules: [
                  {
                    type   : 'empty',
                    prompt : 'Please enter your password'
                  },
                  {
                    type   : 'length[6]',
                    prompt : 'Your password must be at least 6 characters'
                  }
                ]
              }
            }
          })
        ;
      })
    ;

    if ($('#main_menu').is(':visible')) {
      $('#main_menu').transition('slide out left');
    }
    if ($('#following_menu').is(':visible')) {
      $('#following_menu').transition('slide out left');
    }

    this.serverErrorOccured = false;
    this.loginErrorOccured = false;
    this.loggingIn = false;
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
    // TODO display error messages
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
          this.router.navigate([this.redirectUrl]);
          this.loginErrorOccured = false;
          this.serverErrorOccured = false;
          this.loggingIn = true;
        },
        error => this.handleLoginError(error),
        async function () {
          await
            delay(3000)
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



