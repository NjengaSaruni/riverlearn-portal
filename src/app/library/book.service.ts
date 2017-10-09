/**
 * Created by saruni on 5/18/17.
 */

import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class BookService {
  private  booksUrl = 'http://0.0.0.0:8001/api/v1/library/books/';
  // private  booksUrl = 'http://35.187.27.188:8000/api/v1/library/books/';

  constructor(private http: Http) {}

  getBooks(): Observable<any[]> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let jwt = localStorage.getItem('token');
    if (jwt) {
      headers.append('Authorization', 'Bearer ' + jwt);
    }
    return this.http.get(this.booksUrl, { headers : headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);

  }
}
