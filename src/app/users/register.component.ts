/**
 * Created by saruni on 4/18/17.
 */
import {Component, EventEmitter, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountType, User } from '../common/models/users.models';

import { Subscription } from 'rxjs';
import { UserService } from '../common/services/user.service';
import { Router } from '@angular/router';
import {delay, handleError} from '../common/services/common.service';

declare var $: any;

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  outputs: ['onCreateAccount']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  value: Subscription;

  loggedInUser: any;
  logInResponseData: any;
  users: User[];
  accountTypes: AccountType[];

  serverErrorOccured = false;
  serverErrorMessage: string = 'The are problems connecting to our server.';
  serverErrorMessageTitle: string = 'Please try again later.';

  usernameTaken = true;
  comparingUsernames = false;
  incorrectUsernameFormat = false;

  passwordsMatch = true;
  usernameTouched = false;

  errorMessage: string;
  error: Error;

  onCreateAccount = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.getAccountTypes();
    this.getUsers();
    this.registerForm = this.formBuilder.group({
      username: ['',
        [
          Validators.required,
          Validators.minLength(3),
        ]
      ],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_again: ['', Validators.required],
      account_type: [null, Validators.required],
      first_name: ['', Validators.required],
      middle_name: '',
      last_name: ['', Validators.required],
      terms: [false, Validators.required],
    });

    $(document).ready(function() {
        $('#selectAccountType')
          .dropdown();
      });

    $('input').popup();
  }

  async onKey(event: any) {
    // Compare username with those from database
    let value = this.registerForm.get('username').value.toLowerCase();
    if (event.target.name === 'username') {
      this.usernameTouched = true;
      value = event.target.value.toLowerCase();
    }
    else if (!this.usernameTouched) {
      await delay(300);
      this.registerForm.patchValue({
        username: this.registerForm.get('first_name').value.toLowerCase().split(' ')[0] + this.registerForm.get('last_name').value.toLowerCase().split(' ')[0]
      });
      value = this.registerForm.get('username').value.toLowerCase()
    }

    let nameRegex = /^(\w){1,15}$/;
    this.incorrectUsernameFormat = !value.match(nameRegex);

    this.comparingUsernames = true;
    for (let user of this.users) {
      if (value === '' || value === user.username) {
        this.usernameTaken = true;
        break;
      }
      else {
        this.usernameTaken = false;
      }
    }
    this.comparingUsernames = false;
  }

  onKeyEmail(event: any) {
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  }

  onKeyPasswordAgain(event: any) {
    if (event.target.value !== this.registerForm.get('password').value) {
      this.passwordsMatch = false;
    }
    else {
      this.passwordsMatch = true;
    }
  }

  async createUser(event: any) {
    // TODO: add show creating account message.
    let username = this.registerForm.get('username').value.toLowerCase();
    // FIXME: Ensure passwords match to allow user to create account
    let password = this.registerForm.get('password').value;
    let first_name = this.registerForm.get('first_name').value;
    let last_name = this.registerForm.get('last_name').value;
    let middle_name = this.registerForm.get('middle_name').value;
    let email = this.registerForm.get('email').value;
    let account_type = this.registerForm.get('account_type').value;

    this.value = this.userService.createUser(
      username, password, first_name, last_name, middle_name, email, account_type)
      .subscribe(
        data => this.loggedInUser = data,
        // TODO: Display error messages
        handleError
      );

    if (!this.error) {
      await delay(600);
      this.userService.auth(username, password)
        .subscribe(
          data => {
            this.userService.saveJwt(data.token);
            this.onCreateAccount.emit(event);
          },
          error => this.handleError);
    } else {
      console.log(this.error['status']);
    }

  }
  handleError(error: any){

    if(error.status >= 400){

    }
    else if(error.status >= 500) {
      this.serverErrorOccured = true;
    }
  }


  redirectToTerms(): void {
    this.closeRegistrationModal();
    this.router.navigate(['/terms']);
  }

  getAccountTypes() {
    this.userService.getAccountTypes()
      .subscribe(
        accountTypes => this.accountTypes = accountTypes,
        error => this.errorMessage = <any>error);
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        users => this.users = users,
        error => this.errorMessage = <any>error);
  }

  closeOpenLogin() {
    $('#registerModal')
      .modal('hide');
    $('#loginModal')
      .modal('show');

  }

  closeRegistrationModal() {
    $('#registerModal')
      .modal('hide');
  }

}
