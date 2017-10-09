/**
 * Created by saruni on 4/9/17.
 */

import {Injectable } from '@angular/core';
import {URLSearchParams} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {AccountType, JoinRequest, Token, User} from '../models/users.models';
import {CommonService, handleError, JwtHelper } from './common.service';

@Injectable()
export class UserService extends CommonService {
  private authUrl = 'api-token-auth/';
  private usersUrl = 'users/';
  private createUsersUrl = this.usersUrl + 'create/';
  private accountTypesUrl = this.usersUrl + 'account_types/';
  private joinRequestsUrl = this.usersUrl + 'join_requests/';

  protected user: User;

  getUsers(): Observable<User[]> {
    return this.makeRequest(this.usersUrl,'GET')
  }

  getUser(id: string): Observable<User> {
    id += '/';
    return this.makeRequest(this.usersUrl + id , 'GET')
  }

  getLoggedInUser(): Observable<User> {
    let jwtHelper: JwtHelper = new JwtHelper();
    let token = this.getJwtToken();
    let user = jwtHelper.decodeToken(token);

    return this.getUser(user.user_id)
  }

  fetchLoggedInUser(){
    this.getLoggedInUser().subscribe(
      user => this.user = user
    );

    return this.user
  }


  getAccountTypes(): Observable<AccountType[]> {
    return this.makeRequest(this.accountTypesUrl, 'GET')
  }

  login(): Observable<boolean> {
    return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }


  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.isLoggedIn = false;

    window.location.reload();
  }

  auth(username: string, password: string ): Observable<Token> {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    return this.makeRequest(this.authUrl, 'POST' , { username, password });
  }

  saveJwt(jwt: any, remember: boolean =  false, event: any = null) {
    if (jwt) {
      if (remember){
        sessionStorage.setItem('token', jwt);
        localStorage.setItem('token', jwt);
      }
      else{
        localStorage.setItem('token', jwt);
      }
      this.isLoggedIn = true;
    }
  }

  createUser(
    username: string, password: string,
    first_name: string, last_name: string,
    middle_name: string , email: string,
    account_type: string ): Observable<User> {
    return this.makeRequest(this.createUsersUrl,'POST', { username, password , first_name, last_name, email, middle_name, account_type});
  }

  getJoinRequests(type: string = null): Observable<JoinRequest[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('type', type);

    return this.makeRequest(this.joinRequestsUrl, 'GET', null, params);
  }

  patchRequest(id: string, approved: boolean): Observable<any> {
    id += '/';
    return this.makeRequest(this.joinRequestsUrl + id, 'PATCH', { approved })
  }

  getInstitutionRequests(type: string = null): Observable<JoinRequest[]>{
      this.getLoggedInUser().subscribe(
        user => this.user = user,
        handleError
      );
      return this.getJoinRequests(type)
        .map(requests => requests.filter(request => request.institution.id === this.user.institution.id))
  }

  createInstitutionJoinRequest(
    institution: string, notes: string = null): Observable<JoinRequest> {
    return this.makeRequest(this.joinRequestsUrl,'POST', { institution, notes });
  }
}
